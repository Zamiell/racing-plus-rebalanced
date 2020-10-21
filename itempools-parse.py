# Imports
import sys
import xml.etree.ElementTree as ET

def main():
    total_items = {}
    item_pools = ET.parse('mod/resources/itempools.xml').getroot()
    item_list = []
    for pool in item_pools:
        count = 0
        for item in pool:
            count += 1

            if item.attrib['DecreaseBy'] != item.attrib['Weight']:
                print('ERROR: The DecreaseBy for item ' + item.attrib['Id'] + ' is wrong.')
                sys.exit(1)

            if item.attrib['RemoveOn'] != '0.1':
                print('ERROR: The RemoveOn for item ' + item.attrib['Id'] + ' is not 0.1.')
                sys.exit(1)

            if (
                not pool.attrib['Name'] == 'library'
                and not pool.attrib['Name'] == 'redChest'
                and not pool.attrib['Name'] == 'curse'
            ):
                if 'Id' in item.attrib and item.attrib['Id'] in item_list:
                    print('ERROR: Item ' + item.attrib['Id'] + ' is in multiple pools.')
                    sys.exit(1)

            if 'Id' in item.attrib and item.attrib['Id'] not in item_list:
                item_list.append(item.attrib['Id'])

        if count != 0:
            if pool.attrib['Name'] not in total_items:
                total_items[pool.attrib['Name']] = 0
            total_items[pool.attrib['Name']] += count
            this_pool_total_items = total_items[pool.attrib['Name']]
            print('There are ' + str(this_pool_total_items) + ' items in the ' + pool.attrib['Name'] + ' pool.')

        if pool.attrib['Name'] == 'shop':
            mapping_items = [
                '21', # The Compass
                '54', # Treasure Map
                '246', # Blue Map
                '287', # Book of Secrets
            ]
            correct_weight = find_correct_weight(this_pool_total_items, len(mapping_items), 15)
            for mapping_item in mapping_items:
                for item in pool:
                    if 'Id' in item.attrib and item.attrib['Id'] == mapping_item:
                        if (
                            item.attrib['Weight'] != correct_weight
                            or item.attrib['DecreaseBy'] != correct_weight
                        ):
                            print('ERROR: Item ' + str(mapping_item) + " does not have the correct weight.")
        elif pool.attrib['Name'] == 'devil':
            orbital_item = '73' # Cube of Meat
            correct_weight = find_correct_weight(this_pool_total_items, 1, 15)
            for item in pool:
                if 'Id' in item.attrib and item.attrib['Id'] == orbital_item:
                    if (
                        item.attrib['Weight'] != correct_weight
                        or item.attrib['DecreaseBy'] != correct_weight
                    ):
                        print('ERROR: Item ' + str(orbital_item) + " does not have the correct weight.")
        elif pool.attrib['Name'] == 'angel':
            orbital_item = '207' # Ball of Bandages
            correct_weight = find_correct_weight(this_pool_total_items, 1, 15)
            for item in pool:
                if 'Id' in item.attrib and item.attrib['Id'] == orbital_item:
                    if (
                        item.attrib['Weight'] != correct_weight
                        or item.attrib['DecreaseBy'] != correct_weight
                    ):
                        print('ERROR: Item ' + str(orbital_item) + " does not have the correct weight.")

    unused_item_ids = ['43', '59', '61', '235', '263']
    removed_items = [
        '16', '18', '19',
        '29',
        '30', '31', '36',
        '41', '46',
        '55', '56',
        '60', '62', '66',
        '72', '74',
        '81', '82', '84', '89',
        '93', '96',
        '103',
        '111', '112',
        '120', '124', '125', '127', '129',
        '133', '134', '136', '139',
        '141', '144', '147',
        '152', '155',
        '166',
        '171', '177', '178',
        '181',
        '194', '195', '198', '199',
        '201', '203',
        '210', '212', '214', '215',
        '222', '228',
        '231',
        '240',
        '250', '254', '258',
        '260', '262', '264', '267', '269',
        '274', '279',
        '281', '283', '284', '285', '289',
        '290', '294', '295', '296',
        '301', '303', '304',
        '314', '319',
        '321', '325', '326',
        '333', '337', '338', '339',
        '349',
        '352', '355', '356',
        '363', '365', '367',
        '371',
        '380', '382', '383', '386', '387', '388',
        '392', '398',
        '402', '403', '405', '406',
        '410', '412', '413', '416', '419',
        '425', '426', '427',
        '430', '436', '437',
        '446', '447', '448',
        '450', '451', '455', '459',
        '460', '464', '468', '469',
        '470', '472',
        '481', '482', '486', '488', '489',
        '497',
        '501', '502', '503', '506', '507', '509',
        '511', '513', '514', '517', '518', '519',
        '520', '522',
        '532', '535', '537', '539',
        '548',
    ]
    improved_items = [
        '36', # The Poop
        '39', # Mom's Bra
        '123', # Monster's Manual
        '152', # Technology 2
        '204', # Fanny Pack
        '288', # Box of Spiders
        '313', # Holy Mantle
        '370', # Mr. Dolly
        '441', # Mega Blast
        '493', # Adrenaline
        '505', # Poke Go
     ]
    starting_items = ['105', '498', '534'] # D6, Duality, Schoolbag
    items_not_supposed_to_be_in_pools = [
        '90', # The Small Rock
        '158', # Crystal Ball
        '238', '239', # Key Piece #1, Key Piece #2
        '327', '328', # The Polaroid, The Negative
        '474', # Tonsil
        '550', '551', '552', # Broken Shovel (1), Broken Shovel (2), Mom's Shovel
    ]

    for item in removed_items:
        if item in item_list:
            print('ERROR: Item ' + item + ' is in a pool but it is supposed to be removed from the game.')
            sys.exit(1)

    for i in range(1, 552):
        item = str(i)
        if (
            item not in item_list
            and item not in unused_item_ids
            and item not in removed_items
            and item not in improved_items
            and item not in starting_items
            and item not in items_not_supposed_to_be_in_pools
        ):
            print('ERROR: Item ' + item + ' is not in a pool.')
            sys.exit(1)

    print('\nThe item pools are valid.')

def find_correct_weight(count, num_weighted_items, num_desired_percent):
    base_weight = count - num_weighted_items
    weight = 1
    while True:
        weight = weight + 0.01
        total_weight = base_weight + (weight * num_weighted_items)
        probability = (weight * num_weighted_items) / total_weight * 100
        if probability > num_desired_percent:
            break
    correct_weight = str(round(weight, 2))
    print('For ' + str(num_weighted_items) + ' item(s), weight ' + correct_weight + ' = ' + str(round(probability, 0)) + '%')
    return correct_weight

if __name__ == "__main__":
    main()
