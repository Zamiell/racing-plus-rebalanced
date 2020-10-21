
local ____modules = {}
local ____moduleCache = {}
local ____originalRequire = require
local function require(file)
    if ____moduleCache[file] then
        return ____moduleCache[file]
    end
    if ____modules[file] then
        ____moduleCache[file] = ____modules[file]()
        return ____moduleCache[file]
    else
        if ____originalRequire then
            return ____originalRequire(file)
        else
            error("module '" .. file .. "' not found")
        end
    end
end
____modules = {
["lualib_bundle"] = function() function __TS__ArrayConcat(arr1, ...)
    local args = {...}
    local out = {}
    for ____, val in ipairs(arr1) do
        out[#out + 1] = val
    end
    for ____, arg in ipairs(args) do
        if pcall(
            function() return #arg end
        ) and (type(arg) ~= "string") then
            local argAsArray = arg
            for ____, val in ipairs(argAsArray) do
                out[#out + 1] = val
            end
        else
            out[#out + 1] = arg
        end
    end
    return out
end

function __TS__ArrayEvery(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if not callbackfn(_G, arr[i + 1], i, arr) then
                return false
            end
            i = i + 1
        end
    end
    return true
end

function __TS__ArrayFilter(arr, callbackfn)
    local result = {}
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                result[#result + 1] = arr[i + 1]
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArrayForEach(arr, callbackFn)
    do
        local i = 0
        while i < #arr do
            callbackFn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
end

function __TS__ArrayFind(arr, predicate)
    local len = #arr
    local k = 0
    while k < len do
        local elem = arr[k + 1]
        if predicate(_G, elem, k, arr) then
            return elem
        end
        k = k + 1
    end
    return nil
end

function __TS__ArrayFindIndex(arr, callbackFn)
    do
        local i = 0
        local len = #arr
        while i < len do
            if callbackFn(_G, arr[i + 1], i, arr) then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayIncludes(self, searchElement, fromIndex)
    if fromIndex == nil then
        fromIndex = 0
    end
    local len = #self
    local k = fromIndex
    if fromIndex < 0 then
        k = len + fromIndex
    end
    if k < 0 then
        k = 0
    end
    for i = k, len do
        if self[i + 1] == searchElement then
            return true
        end
    end
    return false
end

function __TS__ArrayIndexOf(arr, searchElement, fromIndex)
    local len = #arr
    if len == 0 then
        return -1
    end
    local n = 0
    if fromIndex then
        n = fromIndex
    end
    if n >= len then
        return -1
    end
    local k
    if n >= 0 then
        k = n
    else
        k = len + n
        if k < 0 then
            k = 0
        end
    end
    do
        local i = k
        while i < len do
            if arr[i + 1] == searchElement then
                return i
            end
            i = i + 1
        end
    end
    return -1
end

function __TS__ArrayJoin(self, separator)
    if separator == nil then
        separator = ","
    end
    local result = ""
    for index, value in ipairs(self) do
        if index > 1 then
            result = tostring(result) .. tostring(separator)
        end
        result = tostring(result) .. tostring(
            tostring(value)
        )
    end
    return result
end

function __TS__ArrayMap(arr, callbackfn)
    local newArray = {}
    do
        local i = 0
        while i < #arr do
            newArray[i + 1] = callbackfn(_G, arr[i + 1], i, arr)
            i = i + 1
        end
    end
    return newArray
end

function __TS__ArrayPush(arr, ...)
    local items = {...}
    for ____, item in ipairs(items) do
        arr[#arr + 1] = item
    end
    return #arr
end

function __TS__ArrayReduce(arr, callbackFn, ...)
    local len = #arr
    local k = 0
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[1]
        k = 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, len - 1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReduceRight(arr, callbackFn, ...)
    local len = #arr
    local k = len - 1
    local accumulator = nil
    if select("#", ...) ~= 0 then
        accumulator = select(1, ...)
    elseif len > 0 then
        accumulator = arr[k + 1]
        k = k - 1
    else
        error("Reduce of empty array with no initial value", 0)
    end
    for i = k, 0, -1 do
        accumulator = callbackFn(_G, accumulator, arr[i + 1], i, arr)
    end
    return accumulator
end

function __TS__ArrayReverse(arr)
    local i = 0
    local j = #arr - 1
    while i < j do
        local temp = arr[j + 1]
        arr[j + 1] = arr[i + 1]
        arr[i + 1] = temp
        i = i + 1
        j = j - 1
    end
    return arr
end

function __TS__ArrayShift(arr)
    return table.remove(arr, 1)
end

function __TS__ArrayUnshift(arr, ...)
    local items = {...}
    do
        local i = #items - 1
        while i >= 0 do
            table.insert(arr, 1, items[i + 1])
            i = i - 1
        end
    end
    return #arr
end

function __TS__ArraySort(arr, compareFn)
    if compareFn ~= nil then
        table.sort(
            arr,
            function(a, b) return compareFn(_G, a, b) < 0 end
        )
    else
        table.sort(arr)
    end
    return arr
end

function __TS__ArraySlice(list, first, last)
    local len = #list
    local relativeStart = first or 0
    local k
    if relativeStart < 0 then
        k = math.max(len + relativeStart, 0)
    else
        k = math.min(relativeStart, len)
    end
    local relativeEnd = last
    if last == nil then
        relativeEnd = len
    end
    local final
    if relativeEnd < 0 then
        final = math.max(len + relativeEnd, 0)
    else
        final = math.min(relativeEnd, len)
    end
    local out = {}
    local n = 0
    while k < final do
        out[n + 1] = list[k + 1]
        k = k + 1
        n = n + 1
    end
    return out
end

function __TS__ArraySome(arr, callbackfn)
    do
        local i = 0
        while i < #arr do
            if callbackfn(_G, arr[i + 1], i, arr) then
                return true
            end
            i = i + 1
        end
    end
    return false
end

function __TS__ArraySplice(list, ...)
    local len = #list
    local actualArgumentCount = select("#", ...)
    local start = select(1, ...)
    local deleteCount = select(2, ...)
    local actualStart
    if start < 0 then
        actualStart = math.max(len + start, 0)
    else
        actualStart = math.min(start, len)
    end
    local itemCount = math.max(actualArgumentCount - 2, 0)
    local actualDeleteCount
    if actualArgumentCount == 0 then
        actualDeleteCount = 0
    elseif actualArgumentCount == 1 then
        actualDeleteCount = len - actualStart
    else
        actualDeleteCount = math.min(
            math.max(deleteCount or 0, 0),
            len - actualStart
        )
    end
    local out = {}
    do
        local k = 0
        while k < actualDeleteCount do
            local from = actualStart + k
            if list[from + 1] then
                out[k + 1] = list[from + 1]
            end
            k = k + 1
        end
    end
    if itemCount < actualDeleteCount then
        do
            local k = actualStart
            while k < (len - actualDeleteCount) do
                local from = k + actualDeleteCount
                local to = k + itemCount
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k + 1
            end
        end
        do
            local k = len
            while k > ((len - actualDeleteCount) + itemCount) do
                list[k] = nil
                k = k - 1
            end
        end
    elseif itemCount > actualDeleteCount then
        do
            local k = len - actualDeleteCount
            while k > actualStart do
                local from = (k + actualDeleteCount) - 1
                local to = (k + itemCount) - 1
                if list[from + 1] then
                    list[to + 1] = list[from + 1]
                else
                    list[to + 1] = nil
                end
                k = k - 1
            end
        end
    end
    local j = actualStart
    for i = 3, actualArgumentCount do
        list[j + 1] = select(i, ...)
        j = j + 1
    end
    do
        local k = #list - 1
        while k >= ((len - actualDeleteCount) + itemCount) do
            list[k + 1] = nil
            k = k - 1
        end
    end
    return out
end

function __TS__ArrayToObject(array)
    local object = {}
    do
        local i = 0
        while i < #array do
            object[i] = array[i + 1]
            i = i + 1
        end
    end
    return object
end

function __TS__ArrayFlat(array, depth)
    if depth == nil then
        depth = 1
    end
    local result = {}
    for ____, value in ipairs(array) do
        if ((depth > 0) and (type(value) == "table")) and ((value[1] ~= nil) or (next(value, nil) == nil)) then
            result = __TS__ArrayConcat(
                result,
                __TS__ArrayFlat(value, depth - 1)
            )
        else
            result[#result + 1] = value
        end
    end
    return result
end

function __TS__ArrayFlatMap(array, callback)
    local result = {}
    do
        local i = 0
        while i < #array do
            local value = callback(_G, array[i + 1], i, array)
            if (type(value) == "table") and ((value[1] ~= nil) or (next(value, nil) == nil)) then
                result = __TS__ArrayConcat(result, value)
            else
                result[#result + 1] = value
            end
            i = i + 1
        end
    end
    return result
end

function __TS__ArraySetLength(arr, length)
    if (((length < 0) or (length ~= length)) or (length == math.huge)) or (math.floor(length) ~= length) then
        error(
            "invalid array length: " .. tostring(length),
            0
        )
    end
    do
        local i = #arr - 1
        while i >= length do
            arr[i + 1] = nil
            i = i - 1
        end
    end
    return length
end

function __TS__Class(self)
    local c = {prototype = {}}
    c.prototype.__index = c.prototype
    c.prototype.constructor = c
    return c
end

function __TS__ClassExtends(target, base)
    target.____super = base
    local staticMetatable = setmetatable({__index = base}, base)
    setmetatable(target, staticMetatable)
    local baseMetatable = getmetatable(base)
    if baseMetatable then
        if type(baseMetatable.__index) == "function" then
            staticMetatable.__index = baseMetatable.__index
        end
        if type(baseMetatable.__newindex) == "function" then
            staticMetatable.__newindex = baseMetatable.__newindex
        end
    end
    setmetatable(target.prototype, base.prototype)
    if type(base.prototype.__index) == "function" then
        target.prototype.__index = base.prototype.__index
    end
    if type(base.prototype.__newindex) == "function" then
        target.prototype.__newindex = base.prototype.__newindex
    end
    if type(base.prototype.__tostring) == "function" then
        target.prototype.__tostring = base.prototype.__tostring
    end
end

function __TS__CloneDescriptor(____bindingPattern0)
    local enumerable
    enumerable = ____bindingPattern0.enumerable
    local configurable
    configurable = ____bindingPattern0.configurable
    local get
    get = ____bindingPattern0.get
    local set
    set = ____bindingPattern0.set
    local writable
    writable = ____bindingPattern0.writable
    local value
    value = ____bindingPattern0.value
    local descriptor = {enumerable = enumerable == true, configurable = configurable == true}
    local hasGetterOrSetter = (get ~= nil) or (set ~= nil)
    local hasValueOrWritableAttribute = (writable ~= nil) or (value ~= nil)
    if hasGetterOrSetter and hasValueOrWritableAttribute then
        error("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute.", 0)
    end
    if get or set then
        descriptor.get = get
        descriptor.set = set
    else
        descriptor.value = value
        descriptor.writable = writable == true
    end
    return descriptor
end

function __TS__Decorate(decorators, target, key, desc)
    local result = target
    do
        local i = #decorators
        while i >= 0 do
            local decorator = decorators[i + 1]
            if decorator then
                local oldResult = result
                if key == nil then
                    result = decorator(_G, result)
                elseif desc == true then
                    local value = rawget(target, key)
                    local descriptor = __TS__ObjectGetOwnPropertyDescriptor(target, key) or ({configurable = true, writable = true, value = value})
                    local desc = decorator(_G, target, key, descriptor) or descriptor
                    local isSimpleValue = (((desc.configurable == true) and (desc.writable == true)) and (not desc.get)) and (not desc.set)
                    if isSimpleValue then
                        rawset(target, key, desc.value)
                    else
                        __TS__SetDescriptor(
                            target,
                            key,
                            __TS__ObjectAssign({}, descriptor, desc)
                        )
                    end
                elseif desc == false then
                    result = decorator(_G, target, key, desc)
                else
                    result = decorator(_G, target, key)
                end
                result = result or oldResult
            end
            i = i - 1
        end
    end
    return result
end

function __TS__DecorateParam(paramIndex, decorator)
    return function(____, target, key) return decorator(_G, target, key, paramIndex) end
end

function __TS__ObjectGetOwnPropertyDescriptors(object)
    local metatable = getmetatable(object)
    if not metatable then
        return {}
    end
    return rawget(metatable, "_descriptors")
end

function __TS__Delete(target, key)
    local descriptors = __TS__ObjectGetOwnPropertyDescriptors(target)
    local descriptor = descriptors[key]
    if descriptor then
        if not descriptor.configurable then
            error(
                ((("Cannot delete property " .. tostring(key)) .. " of ") .. tostring(target)) .. ".",
                0
            )
        end
        descriptors[key] = nil
        return true
    end
    if target[key] ~= nil then
        target[key] = nil
        return true
    end
    return false
end

function __TS__DelegatedYield(iterable)
    if type(iterable) == "string" then
        for index = 0, #iterable - 1 do
            coroutine.yield(
                __TS__StringAccess(iterable, index)
            )
        end
    elseif iterable.____coroutine ~= nil then
        local co = iterable.____coroutine
        while true do
            local status, value = coroutine.resume(co)
            if not status then
                error(value, 0)
            end
            if coroutine.status(co) == "dead" then
                return value
            else
                coroutine.yield(value)
            end
        end
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                return result.value
            else
                coroutine.yield(result.value)
            end
        end
    else
        for ____, value in ipairs(iterable) do
            coroutine.yield(value)
        end
    end
end

function __TS__New(target, ...)
    local instance = setmetatable({}, target.prototype)
    instance:____constructor(...)
    return instance
end

function __TS__GetErrorStack(self, constructor)
    local level = 1
    while true do
        local info = debug.getinfo(level, "f")
        level = level + 1
        if not info then
            level = 1
            break
        elseif info.func == constructor then
            break
        end
    end
    return debug.traceback(nil, level)
end
function __TS__WrapErrorToString(self, getDescription)
    return function(self)
        local description = getDescription(self)
        local caller = debug.getinfo(3, "f")
        if (_VERSION == "Lua 5.1") or (caller and (caller.func ~= error)) then
            return description
        else
            return (tostring(description) .. "\n") .. tostring(self.stack)
        end
    end
end
function __TS__InitErrorClass(self, Type, name)
    Type.name = name
    return setmetatable(
        Type,
        {
            __call = function(____, _self, message) return __TS__New(Type, message) end
        }
    )
end
Error = __TS__InitErrorClass(
    _G,
    (function()
        local ____ = __TS__Class()
        ____.name = ""
        function ____.prototype.____constructor(self, message)
            if message == nil then
                message = ""
            end
            self.message = message
            self.name = "Error"
            self.stack = __TS__GetErrorStack(_G, self.constructor.new)
            local metatable = getmetatable(self)
            if not metatable.__errorToStringPatched then
                metatable.__errorToStringPatched = true
                metatable.__tostring = __TS__WrapErrorToString(_G, metatable.__tostring)
            end
        end
        function ____.prototype.__tostring(self)
            return (((self.message ~= "") and (function() return (tostring(self.name) .. ": ") .. tostring(self.message) end)) or (function() return self.name end))()
        end
        return ____
    end)(),
    "Error"
)
for ____, errorName in ipairs({"RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"}) do
    _G[errorName] = __TS__InitErrorClass(
        _G,
        (function()
            local ____ = __TS__Class()
            ____.name = ____.name
            __TS__ClassExtends(____, Error)
            function ____.prototype.____constructor(self, ...)
                Error.prototype.____constructor(self, ...)
                self.name = errorName
            end
            return ____
        end)(),
        errorName
    )
end

__TS__Unpack = table.unpack or unpack

function __TS__FunctionBind(fn, thisArg, ...)
    local boundArgs = {...}
    return function(____, ...)
        local args = {...}
        do
            local i = 0
            while i < #boundArgs do
                table.insert(args, i + 1, boundArgs[i + 1])
                i = i + 1
            end
        end
        return fn(
            thisArg,
            __TS__Unpack(args)
        )
    end
end

____symbolMetatable = {
    __tostring = function(self)
        return ("Symbol(" .. tostring(self.description or "")) .. ")"
    end
}
function __TS__Symbol(description)
    return setmetatable({description = description}, ____symbolMetatable)
end
Symbol = {
    iterator = __TS__Symbol("Symbol.iterator"),
    hasInstance = __TS__Symbol("Symbol.hasInstance"),
    species = __TS__Symbol("Symbol.species"),
    toStringTag = __TS__Symbol("Symbol.toStringTag")
}

function __TS__GeneratorIterator(self)
    return self
end
function __TS__GeneratorNext(self, ...)
    local co = self.____coroutine
    if coroutine.status(co) == "dead" then
        return {done = true}
    end
    local status, value = coroutine.resume(co, ...)
    if not status then
        error(value, 0)
    end
    return {
        value = value,
        done = coroutine.status(co) == "dead"
    }
end
function __TS__Generator(fn)
    return function(...)
        local args = {...}
        local argsLength = select("#", ...)
        return {
            ____coroutine = coroutine.create(
                function() return fn(
                    (unpack or table.unpack)(args, 1, argsLength)
                ) end
            ),
            [Symbol.iterator] = __TS__GeneratorIterator,
            next = __TS__GeneratorNext
        }
    end
end

function __TS__InstanceOf(obj, classTbl)
    if type(classTbl) ~= "table" then
        error("Right-hand side of 'instanceof' is not an object", 0)
    end
    if classTbl[Symbol.hasInstance] ~= nil then
        return not (not classTbl[Symbol.hasInstance](classTbl, obj))
    end
    if type(obj) == "table" then
        local luaClass = obj.constructor
        while luaClass ~= nil do
            if luaClass == classTbl then
                return true
            end
            luaClass = luaClass.____super
        end
    end
    return false
end

function __TS__InstanceOfObject(value)
    local valueType = type(value)
    return (valueType == "table") or (valueType == "function")
end

function __TS__IteratorGeneratorStep(self)
    local co = self.____coroutine
    local status, value = coroutine.resume(co)
    if not status then
        error(value, 0)
    end
    if coroutine.status(co) == "dead" then
        return
    end
    return true, value
end
function __TS__IteratorIteratorStep(self)
    local result = self:next()
    if result.done then
        return
    end
    return true, result.value
end
function __TS__IteratorStringStep(self, index)
    index = index + 1
    if index > #self then
        return
    end
    return index, string.sub(self, index, index)
end
function __TS__Iterator(iterable)
    if type(iterable) == "string" then
        return __TS__IteratorStringStep, iterable, 0
    elseif iterable.____coroutine ~= nil then
        return __TS__IteratorGeneratorStep, iterable
    elseif iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        return __TS__IteratorIteratorStep, iterator
    else
        return ipairs(iterable)
    end
end

Map = (function()
    local Map = __TS__Class()
    Map.name = "Map"
    function Map.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "Map"
        self.items = {}
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self:set(value[1], value[2])
            end
        else
            local array = entries
            for ____, kvp in ipairs(array) do
                self:set(kvp[1], kvp[2])
            end
        end
    end
    function Map.prototype.clear(self)
        self.items = {}
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Map.prototype.delete(self, key)
        local contains = self:has(key)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[key]
            local previous = self.previousKey[key]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[key] = nil
            self.previousKey[key] = nil
        end
        self.items[key] = nil
        return contains
    end
    function Map.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, self.items[key], key, self)
        end
    end
    function Map.prototype.get(self, key)
        return self.items[key]
    end
    function Map.prototype.has(self, key)
        return (self.nextKey[key] ~= nil) or (self.lastKey == key)
    end
    function Map.prototype.set(self, key, value)
        local isNewValue = not self:has(key)
        if isNewValue then
            self.size = self.size + 1
        end
        self.items[key] = value
        if self.firstKey == nil then
            self.firstKey = key
            self.lastKey = key
        elseif isNewValue then
            self.nextKey[self.lastKey] = key
            self.previousKey[key] = self.lastKey
            self.lastKey = key
        end
        return self
    end
    Map.prototype[Symbol.iterator] = function(self)
        return self:entries()
    end
    function Map.prototype.entries(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, items[key]}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Map.prototype.values(self)
        local ____ = self
        local items = ____.items
        local nextKey = ____.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = items[key]}
                key = nextKey[key]
                return result
            end
        }
    end
    Map[Symbol.species] = Map
    return Map
end)()

__TS__MathAtan2 = math.atan2 or math.atan

function __TS__Number(value)
    local valueType = type(value)
    if valueType == "number" then
        return value
    elseif valueType == "string" then
        local numberValue = tonumber(value)
        if numberValue then
            return numberValue
        end
        if value == "Infinity" then
            return math.huge
        end
        if value == "-Infinity" then
            return -math.huge
        end
        local stringWithoutSpaces = string.gsub(value, "%s", "")
        if stringWithoutSpaces == "" then
            return 0
        end
        return 0 / 0
    elseif valueType == "boolean" then
        return (value and 1) or 0
    else
        return 0 / 0
    end
end

function __TS__NumberIsFinite(value)
    return (((type(value) == "number") and (value == value)) and (value ~= math.huge)) and (value ~= -math.huge)
end

function __TS__NumberIsNaN(value)
    return value ~= value
end

____radixChars = "0123456789abcdefghijklmnopqrstuvwxyz"
function __TS__NumberToString(self, radix)
    if ((((radix == nil) or (radix == 10)) or (self == math.huge)) or (self == -math.huge)) or (self ~= self) then
        return tostring(self)
    end
    radix = math.floor(radix)
    if (radix < 2) or (radix > 36) then
        error("toString() radix argument must be between 2 and 36", 0)
    end
    local integer, fraction = math.modf(
        math.abs(self)
    )
    local result = ""
    if radix == 8 then
        result = string.format("%o", integer)
    elseif radix == 16 then
        result = string.format("%x", integer)
    else
        repeat
            do
                result = tostring(
                    __TS__StringAccess(____radixChars, integer % radix)
                ) .. tostring(result)
                integer = math.floor(integer / radix)
            end
        until not (integer ~= 0)
    end
    if fraction ~= 0 then
        result = tostring(result) .. "."
        local delta = 1e-16
        repeat
            do
                fraction = fraction * radix
                delta = delta * radix
                local digit = math.floor(fraction)
                result = tostring(result) .. tostring(
                    __TS__StringAccess(____radixChars, digit)
                )
                fraction = fraction - digit
            end
        until not (fraction >= delta)
    end
    if self < 0 then
        result = "-" .. tostring(result)
    end
    return result
end

function __TS__ObjectAssign(to, ...)
    local sources = {...}
    if to == nil then
        return to
    end
    for ____, source in ipairs(sources) do
        for key in pairs(source) do
            to[key] = source[key]
        end
    end
    return to
end

function ____descriptorIndex(self, key)
    local value = rawget(self, key)
    if value ~= nil then
        return value
    end
    local metatable = getmetatable(self)
    while metatable do
        local rawResult = rawget(metatable, key)
        if rawResult ~= nil then
            return rawResult
        end
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.get then
                    return descriptor.get(self)
                end
                return descriptor.value
            end
        end
        metatable = getmetatable(metatable)
    end
end
function ____descriptorNewindex(self, key, value)
    local metatable = getmetatable(self)
    while metatable do
        local descriptors = rawget(metatable, "_descriptors")
        if descriptors then
            local descriptor = descriptors[key]
            if descriptor then
                if descriptor.set then
                    descriptor.set(self, value)
                else
                    if descriptor.writable == false then
                        error(
                            ((("Cannot assign to read only property '" .. tostring(key)) .. "' of object '") .. tostring(self)) .. "'",
                            0
                        )
                    end
                    descriptor.value = value
                end
                return
            end
        end
        metatable = getmetatable(metatable)
    end
    rawset(self, key, value)
end
function __TS__SetDescriptor(target, key, desc, isPrototype)
    if isPrototype == nil then
        isPrototype = false
    end
    local metatable = ((isPrototype and (function() return target end)) or (function() return getmetatable(target) end))()
    if not metatable then
        metatable = {}
        setmetatable(target, metatable)
    end
    local value = rawget(target, key)
    if value ~= nil then
        rawset(target, key, nil)
    end
    if not rawget(metatable, "_descriptors") then
        metatable._descriptors = {}
    end
    local descriptor = __TS__CloneDescriptor(desc)
    metatable._descriptors[key] = descriptor
    metatable.__index = ____descriptorIndex
    metatable.__newindex = ____descriptorNewindex
end

function __TS__ObjectDefineProperty(target, key, desc)
    local luaKey = (((type(key) == "number") and (function() return key + 1 end)) or (function() return key end))()
    local value = rawget(target, luaKey)
    local hasGetterOrSetter = (desc.get ~= nil) or (desc.set ~= nil)
    local descriptor
    if hasGetterOrSetter then
        if value ~= nil then
            error(
                "Cannot redefine property: " .. tostring(key),
                0
            )
        end
        descriptor = desc
    else
        local valueExists = value ~= nil
        descriptor = {
            set = desc.set,
            get = desc.get,
            configurable = (((desc.configurable ~= nil) and (function() return desc.configurable end)) or (function() return valueExists end))(),
            enumerable = (((desc.enumerable ~= nil) and (function() return desc.enumerable end)) or (function() return valueExists end))(),
            writable = (((desc.writable ~= nil) and (function() return desc.writable end)) or (function() return valueExists end))(),
            value = (((desc.value ~= nil) and (function() return desc.value end)) or (function() return value end))()
        }
    end
    __TS__SetDescriptor(target, luaKey, descriptor)
    return target
end

function __TS__ObjectEntries(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = {key, obj[key]}
    end
    return result
end

function __TS__ObjectFromEntries(entries)
    local obj = {}
    local iterable = entries
    if iterable[Symbol.iterator] then
        local iterator = iterable[Symbol.iterator](iterable)
        while true do
            local result = iterator:next()
            if result.done then
                break
            end
            local value = result.value
            obj[value[1]] = value[2]
        end
    else
        for ____, entry in ipairs(entries) do
            obj[entry[1]] = entry[2]
        end
    end
    return obj
end

function __TS__ObjectGetOwnPropertyDescriptor(object, key)
    local metatable = getmetatable(object)
    if not metatable then
        return
    end
    if not rawget(metatable, "_descriptors") then
        return
    end
    return rawget(metatable, "_descriptors")[key]
end

function __TS__ObjectKeys(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = key
    end
    return result
end

function __TS__ObjectRest(target, usedProperties)
    local result = {}
    for property in pairs(target) do
        if not usedProperties[property] then
            result[property] = target[property]
        end
    end
    return result
end

function __TS__ObjectValues(obj)
    local result = {}
    for key in pairs(obj) do
        result[#result + 1] = obj[key]
    end
    return result
end

function __TS__ParseFloat(numberString)
    local infinityMatch = string.match(numberString, "^%s*(-?Infinity)")
    if infinityMatch then
        return (((__TS__StringAccess(infinityMatch, 0) == "-") and (function() return -math.huge end)) or (function() return math.huge end))()
    end
    local number = tonumber(
        string.match(numberString, "^%s*(-?%d+%.?%d*)")
    )
    return number or (0 / 0)
end

__TS__parseInt_base_pattern = "0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTvVwWxXyYzZ"
function __TS__ParseInt(numberString, base)
    if base == nil then
        base = 10
        local hexMatch = string.match(numberString, "^%s*-?0[xX]")
        if hexMatch then
            base = 16
            numberString = ((string.match(hexMatch, "-") and (function() return "-" .. tostring(
                __TS__StringSubstr(numberString, #hexMatch)
            ) end)) or (function() return __TS__StringSubstr(numberString, #hexMatch) end))()
        end
    end
    if (base < 2) or (base > 36) then
        return 0 / 0
    end
    local allowedDigits = (((base <= 10) and (function() return __TS__StringSubstring(__TS__parseInt_base_pattern, 0, base) end)) or (function() return __TS__StringSubstr(__TS__parseInt_base_pattern, 0, 10 + (2 * (base - 10))) end))()
    local pattern = ("^%s*(-?[" .. tostring(allowedDigits)) .. "]*)"
    local number = tonumber(
        string.match(numberString, pattern),
        base
    )
    if number == nil then
        return 0 / 0
    end
    if number >= 0 then
        return math.floor(number)
    else
        return math.ceil(number)
    end
end

Set = (function()
    local Set = __TS__Class()
    Set.name = "Set"
    function Set.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "Set"
        self.size = 0
        self.nextKey = {}
        self.previousKey = {}
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self:add(result.value)
            end
        else
            local array = values
            for ____, value in ipairs(array) do
                self:add(value)
            end
        end
    end
    function Set.prototype.add(self, value)
        local isNewValue = not self:has(value)
        if isNewValue then
            self.size = self.size + 1
        end
        if self.firstKey == nil then
            self.firstKey = value
            self.lastKey = value
        elseif isNewValue then
            self.nextKey[self.lastKey] = value
            self.previousKey[value] = self.lastKey
            self.lastKey = value
        end
        return self
    end
    function Set.prototype.clear(self)
        self.nextKey = {}
        self.previousKey = {}
        self.firstKey = nil
        self.lastKey = nil
        self.size = 0
    end
    function Set.prototype.delete(self, value)
        local contains = self:has(value)
        if contains then
            self.size = self.size - 1
            local next = self.nextKey[value]
            local previous = self.previousKey[value]
            if next and previous then
                self.nextKey[previous] = next
                self.previousKey[next] = previous
            elseif next then
                self.firstKey = next
                self.previousKey[next] = nil
            elseif previous then
                self.lastKey = previous
                self.nextKey[previous] = nil
            else
                self.firstKey = nil
                self.lastKey = nil
            end
            self.nextKey[value] = nil
            self.previousKey[value] = nil
        end
        return contains
    end
    function Set.prototype.forEach(self, callback)
        for ____, key in __TS__Iterator(
            self:keys()
        ) do
            callback(_G, key, key, self)
        end
    end
    function Set.prototype.has(self, value)
        return (self.nextKey[value] ~= nil) or (self.lastKey == value)
    end
    Set.prototype[Symbol.iterator] = function(self)
        return self:values()
    end
    function Set.prototype.entries(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = {key, key}}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.keys(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    function Set.prototype.values(self)
        local nextKey = self.nextKey
        local key = self.firstKey
        return {
            [Symbol.iterator] = function(self)
                return self
            end,
            next = function(self)
                local result = {done = not key, value = key}
                key = nextKey[key]
                return result
            end
        }
    end
    Set[Symbol.species] = Set
    return Set
end)()

WeakMap = (function()
    local WeakMap = __TS__Class()
    WeakMap.name = "WeakMap"
    function WeakMap.prototype.____constructor(self, entries)
        self[Symbol.toStringTag] = "WeakMap"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if entries == nil then
            return
        end
        local iterable = entries
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                local value = result.value
                self.items[value[1]] = value[2]
            end
        else
            for ____, kvp in ipairs(entries) do
                self.items[kvp[1]] = kvp[2]
            end
        end
    end
    function WeakMap.prototype.delete(self, key)
        local contains = self:has(key)
        self.items[key] = nil
        return contains
    end
    function WeakMap.prototype.get(self, key)
        return self.items[key]
    end
    function WeakMap.prototype.has(self, key)
        return self.items[key] ~= nil
    end
    function WeakMap.prototype.set(self, key, value)
        self.items[key] = value
        return self
    end
    WeakMap[Symbol.species] = WeakMap
    return WeakMap
end)()

WeakSet = (function()
    local WeakSet = __TS__Class()
    WeakSet.name = "WeakSet"
    function WeakSet.prototype.____constructor(self, values)
        self[Symbol.toStringTag] = "WeakSet"
        self.items = {}
        setmetatable(self.items, {__mode = "k"})
        if values == nil then
            return
        end
        local iterable = values
        if iterable[Symbol.iterator] then
            local iterator = iterable[Symbol.iterator](iterable)
            while true do
                local result = iterator:next()
                if result.done then
                    break
                end
                self.items[result.value] = true
            end
        else
            for ____, value in ipairs(values) do
                self.items[value] = true
            end
        end
    end
    function WeakSet.prototype.add(self, value)
        self.items[value] = true
        return self
    end
    function WeakSet.prototype.delete(self, value)
        local contains = self:has(value)
        self.items[value] = nil
        return contains
    end
    function WeakSet.prototype.has(self, value)
        return self.items[value] == true
    end
    WeakSet[Symbol.species] = WeakSet
    return WeakSet
end)()

function __TS__SourceMapTraceBack(fileName, sourceMap)
    _G.__TS__sourcemap = _G.__TS__sourcemap or ({})
    _G.__TS__sourcemap[fileName] = sourceMap
    if _G.__TS__originalTraceback == nil then
        _G.__TS__originalTraceback = debug.traceback
        debug.traceback = function(thread, message, level)
            local trace
            if ((thread == nil) and (message == nil)) and (level == nil) then
                trace = _G.__TS__originalTraceback()
            else
                trace = _G.__TS__originalTraceback(thread, message, level)
            end
            if type(trace) ~= "string" then
                return trace
            end
            local result = string.gsub(
                trace,
                "(%S+).lua:(%d+)",
                function(file, line)
                    local fileSourceMap = _G.__TS__sourcemap[tostring(file) .. ".lua"]
                    if fileSourceMap and fileSourceMap[line] then
                        return (tostring(file) .. ".ts:") .. tostring(fileSourceMap[line])
                    end
                    return (tostring(file) .. ".lua:") .. tostring(line)
                end
            )
            return result
        end
    end
end

function __TS__Spread(iterable)
    local arr = {}
    if type(iterable) == "string" then
        do
            local i = 0
            while i < #iterable do
                arr[#arr + 1] = __TS__StringAccess(iterable, i)
                i = i + 1
            end
        end
    else
        for ____, item in __TS__Iterator(iterable) do
            arr[#arr + 1] = item
        end
    end
    return __TS__Unpack(arr)
end

function __TS__StringAccess(self, index)
    if (index >= 0) and (index < #self) then
        return string.sub(self, index + 1, index + 1)
    end
end

function __TS__StringCharAt(self, pos)
    if pos ~= pos then
        pos = 0
    end
    if pos < 0 then
        return ""
    end
    return string.sub(self, pos + 1, pos + 1)
end

function __TS__StringCharCodeAt(self, index)
    if index ~= index then
        index = 0
    end
    if index < 0 then
        return 0 / 0
    end
    return string.byte(self, index + 1) or (0 / 0)
end

function __TS__StringConcat(str1, ...)
    local args = {...}
    local out = str1
    for ____, arg in ipairs(args) do
        out = tostring(out) .. tostring(arg)
    end
    return out
end

function __TS__StringEndsWith(self, searchString, endPosition)
    if (endPosition == nil) or (endPosition > #self) then
        endPosition = #self
    end
    return string.sub(self, (endPosition - #searchString) + 1, endPosition) == searchString
end

function __TS__StringPadEnd(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = tostring(fillString) .. tostring(
            string.rep(
                fillString,
                math.floor(maxLength / #fillString)
            )
        )
    end
    return tostring(self) .. tostring(
        string.sub(
            fillString,
            1,
            math.floor(maxLength)
        )
    )
end

function __TS__StringPadStart(self, maxLength, fillString)
    if fillString == nil then
        fillString = " "
    end
    if maxLength ~= maxLength then
        maxLength = 0
    end
    if (maxLength == -math.huge) or (maxLength == math.huge) then
        error("Invalid string length", 0)
    end
    if (#self >= maxLength) or (#fillString == 0) then
        return self
    end
    maxLength = maxLength - #self
    if maxLength > #fillString then
        fillString = tostring(fillString) .. tostring(
            string.rep(
                fillString,
                math.floor(maxLength / #fillString)
            )
        )
    end
    return tostring(
        string.sub(
            fillString,
            1,
            math.floor(maxLength)
        )
    ) .. tostring(self)
end

function __TS__StringReplace(source, searchValue, replaceValue)
    searchValue = string.gsub(searchValue, "[%%%(%)%.%+%-%*%?%[%^%$]", "%%%1")
    if type(replaceValue) == "string" then
        replaceValue = string.gsub(replaceValue, "%%", "%%%%")
        local result = string.gsub(source, searchValue, replaceValue, 1)
        return result
    else
        local result = string.gsub(
            source,
            searchValue,
            function(match) return replaceValue(_G, match) end,
            1
        )
        return result
    end
end

function __TS__StringSlice(self, start, ____end)
    if (start == nil) or (start ~= start) then
        start = 0
    end
    if ____end ~= ____end then
        ____end = 0
    end
    if start >= 0 then
        start = start + 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = ____end - 1
    end
    return string.sub(self, start, ____end)
end

function __TS__StringSplit(source, separator, limit)
    if limit == nil then
        limit = 4294967295
    end
    if limit == 0 then
        return {}
    end
    local out = {}
    local index = 0
    local count = 0
    if (separator == nil) or (separator == "") then
        while (index < (#source - 1)) and (count < limit) do
            out[count + 1] = __TS__StringAccess(source, index)
            count = count + 1
            index = index + 1
        end
    else
        local separatorLength = #separator
        local nextIndex = (string.find(source, separator, nil, true) or 0) - 1
        while (nextIndex >= 0) and (count < limit) do
            out[count + 1] = __TS__StringSubstring(source, index, nextIndex)
            count = count + 1
            index = nextIndex + separatorLength
            nextIndex = (string.find(
                source,
                separator,
                math.max(index + 1, 1),
                true
            ) or 0) - 1
        end
    end
    if count < limit then
        out[count + 1] = __TS__StringSubstring(source, index)
    end
    return out
end

function __TS__StringStartsWith(self, searchString, position)
    if (position == nil) or (position < 0) then
        position = 0
    end
    return string.sub(self, position + 1, #searchString + position) == searchString
end

function __TS__StringSubstr(self, from, length)
    if from ~= from then
        from = 0
    end
    if length ~= nil then
        if (length ~= length) or (length <= 0) then
            return ""
        end
        length = length + from
    end
    if from >= 0 then
        from = from + 1
    end
    return string.sub(self, from, length)
end

function __TS__StringSubstring(self, start, ____end)
    if ____end ~= ____end then
        ____end = 0
    end
    if (____end ~= nil) and (start > ____end) then
        start, ____end = __TS__Unpack({____end, start})
    end
    if start >= 0 then
        start = start + 1
    else
        start = 1
    end
    if (____end ~= nil) and (____end < 0) then
        ____end = 0
    end
    return string.sub(self, start, ____end)
end

function __TS__StringTrim(self)
    local result = string.gsub(self, "^[%s ﻿]*(.-)[%s ﻿]*$", "%1")
    return result
end

function __TS__StringTrimEnd(self)
    local result = string.gsub(self, "[%s ﻿]*$", "")
    return result
end

function __TS__StringTrimStart(self)
    local result = string.gsub(self, "^[%s ﻿]*", "")
    return result
end

____symbolRegistry = {}
function __TS__SymbolRegistryFor(key)
    if not ____symbolRegistry[key] then
        ____symbolRegistry[key] = __TS__Symbol(key)
    end
    return ____symbolRegistry[key]
end
function __TS__SymbolRegistryKeyFor(sym)
    for key in pairs(____symbolRegistry) do
        if ____symbolRegistry[key] == sym then
            return key
        end
    end
end

function __TS__TypeOf(value)
    local luaType = type(value)
    if luaType == "table" then
        return "object"
    elseif luaType == "nil" then
        return "undefined"
    else
        return luaType
    end
end

end,
["types.enums.custom"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
____exports.PickupVariantCustom = {}
____exports.PickupVariantCustom.INVISIBLE_PICKUP = Isaac.GetEntityVariantByName("Invisible Pickup")
____exports.PickupVariantCustom[____exports.PickupVariantCustom.INVISIBLE_PICKUP] = "INVISIBLE_PICKUP"
____exports.CollectibleTypeCustom = {}
____exports.CollectibleTypeCustom.COLLECTIBLE_DADS_LOST_COIN_CUSTOM = Isaac.GetItemIdByName("Dad's Lost Coin")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_DADS_LOST_COIN_CUSTOM] = "COLLECTIBLE_DADS_LOST_COIN_CUSTOM"
____exports.CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM = Isaac.GetItemIdByName("Schoolbag")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM] = "COLLECTIBLE_SCHOOLBAG_CUSTOM"
____exports.CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE = Isaac.GetItemIdByName("Mutant Spider's Inner Eye")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE] = "COLLECTIBLE_MUTANT_SPIDER_INNER_EYE"
____exports.CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP = Isaac.GetItemIdByName("Holy Poop")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP] = "COLLECTIBLE_HOLY_POOP"
____exports.CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED = Isaac.GetItemIdByName("Mom's Bra (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED] = "COLLECTIBLE_MOMS_BRA_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED = Isaac.GetItemIdByName("Bob's Rotten Head (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED] = "COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_MONSTER_MANUAL_IMPROVED = Isaac.GetItemIdByName("Monster Manual (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_MONSTER_MANUAL_IMPROVED] = "COLLECTIBLE_MONSTER_MANUAL_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5 = Isaac.GetItemIdByName("Technology 2.5")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5] = "COLLECTIBLE_TECHNOLOGY_2_5"
____exports.CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED = Isaac.GetItemIdByName("Fanny Pack (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED] = "COLLECTIBLE_FANNY_PACK_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED = Isaac.GetItemIdByName("Fire Mind (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED] = "COLLECTIBLE_FIRE_MIND_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED = Isaac.GetItemIdByName("Box of Spiders (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED] = "COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED = Isaac.GetItemIdByName("Holy Mantle (Nerfed)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED] = "COLLECTIBLE_HOLY_MANTLE_NERFED"
____exports.CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED = Isaac.GetItemIdByName("Mr. Dolly (Nerfed)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED] = "COLLECTIBLE_MR_DOLLY_NERFED"
____exports.CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE = Isaac.GetItemIdByName("Mega Blast (Single Use)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE] = "COLLECTIBLE_MEGA_BLAST_SINGLE"
____exports.CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED = Isaac.GetItemIdByName("Adrenaline (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED] = "COLLECTIBLE_ADRENALINE_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED = Isaac.GetItemIdByName("Poke Go (Improved)")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED] = "COLLECTIBLE_POKE_GO_IMPROVED"
____exports.CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY = Isaac.GetItemIdByName("Clockwork Assembly")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY] = "COLLECTIBLE_CLOCKWORK_ASSEMBLY"
____exports.CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION = Isaac.GetItemIdByName("Charging Station")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION] = "COLLECTIBLE_CHARGING_STATION"
____exports.CollectibleTypeCustom.COLLECTIBLE_STRABISMUS = Isaac.GetItemIdByName("Strabismus")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_STRABISMUS] = "COLLECTIBLE_STRABISMUS"
____exports.CollectibleTypeCustom.COLLECTIBLE_U235 = Isaac.GetItemIdByName("U-235")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_U235] = "COLLECTIBLE_U235"
____exports.CollectibleTypeCustom.COLLECTIBLE_CATALOG = Isaac.GetItemIdByName("Catalog")
____exports.CollectibleTypeCustom[____exports.CollectibleTypeCustom.COLLECTIBLE_CATALOG] = "COLLECTIBLE_CATALOG"
____exports.TrinketTypeCustom = {}
____exports.TrinketTypeCustom.TRINKET_WALNUT_IMPROVED = Isaac.GetTrinketIdByName("Walnut (Improved)")
____exports.TrinketTypeCustom[____exports.TrinketTypeCustom.TRINKET_WALNUT_IMPROVED] = "TRINKET_WALNUT_IMPROVED"
____exports.TrinketTypeCustom.TRINKET_ETHEREAL_PENNY = Isaac.GetTrinketIdByName("Ethereal Penny")
____exports.TrinketTypeCustom[____exports.TrinketTypeCustom.TRINKET_ETHEREAL_PENNY] = "TRINKET_ETHEREAL_PENNY"
____exports.TrinketTypeCustom.TRINKET_PENNY_ON_A_STRING = Isaac.GetTrinketIdByName("Penny on a String")
____exports.TrinketTypeCustom[____exports.TrinketTypeCustom.TRINKET_PENNY_ON_A_STRING] = "TRINKET_PENNY_ON_A_STRING"
____exports.SlotVariantCustom = {}
____exports.SlotVariantCustom.TRANSMUTATION_MACHINE = Isaac.GetEntityVariantByName("Transmutation Machine")
____exports.SlotVariantCustom[____exports.SlotVariantCustom.TRANSMUTATION_MACHINE] = "TRANSMUTATION_MACHINE"
____exports.SlotVariantCustom.BOMB_DONATION_MACHINE = Isaac.GetEntityVariantByName("Bomb Donation Machine")
____exports.SlotVariantCustom[____exports.SlotVariantCustom.BOMB_DONATION_MACHINE] = "BOMB_DONATION_MACHINE"
____exports.SlotVariantCustom.KEY_DONATION_MACHINE = Isaac.GetEntityVariantByName("Key Donation Machine")
____exports.SlotVariantCustom[____exports.SlotVariantCustom.KEY_DONATION_MACHINE] = "KEY_DONATION_MACHINE"
____exports.SlotVariantCustom.ROULETTE_TABLE = Isaac.GetEntityVariantByName("Roulette Table")
____exports.SlotVariantCustom[____exports.SlotVariantCustom.ROULETTE_TABLE] = "ROULETTE_TABLE"
____exports.SlotVariantCustom.HOLY_MACHINE = Isaac.GetEntityVariantByName("Holy Machine")
____exports.SlotVariantCustom[____exports.SlotVariantCustom.HOLY_MACHINE] = "HOLY_MACHINE"
____exports.EffectVariantCustom = {}
____exports.EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM = Isaac.GetEntityVariantByName("Dice Room Floor (Custom)")
____exports.EffectVariantCustom[____exports.EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM] = "DICE_ROOM_FLOOR_CUSTOM"
____exports.CreepSubTypeCustom = {}
____exports.CreepSubTypeCustom.FLOOR_EFFECT_CREEP = 12545
____exports.CreepSubTypeCustom[____exports.CreepSubTypeCustom.FLOOR_EFFECT_CREEP] = "FLOOR_EFFECT_CREEP"
____exports.PillEffectCustom = {}
____exports.PillEffectCustom.PILLEFFECT_DAMAGE_UP = Isaac.GetPillEffectByName("Damage Up")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_DAMAGE_UP] = "PILLEFFECT_DAMAGE_UP"
____exports.PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN = Isaac.GetPillEffectByName("Tear Delay Down")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN] = "PILLEFFECT_TEAR_DELAY_DOWN"
____exports.PillEffectCustom.PILLEFFECT_DEAL_AFFINITY = Isaac.GetPillEffectByName("Deal Affinity")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_DEAL_AFFINITY] = "PILLEFFECT_DEAL_AFFINITY"
____exports.PillEffectCustom.PILLEFFECT_BONE_AFFINITY = Isaac.GetPillEffectByName("Bone Affinity")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_BONE_AFFINITY] = "PILLEFFECT_BONE_AFFINITY"
____exports.PillEffectCustom.PILLEFFECT_RESTOCK = Isaac.GetPillEffectByName("Restock")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_RESTOCK] = "PILLEFFECT_RESTOCK"
____exports.PillEffectCustom.PILLEFFECT_GOLDEN_DUMP = Isaac.GetPillEffectByName("Golden Dump")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_GOLDEN_DUMP] = "PILLEFFECT_GOLDEN_DUMP"
____exports.PillEffectCustom.PILLEFFECT_GLIMPSE = Isaac.GetPillEffectByName("Glimpse")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_GLIMPSE] = "PILLEFFECT_GLIMPSE"
____exports.PillEffectCustom.PILLEFFECT_SUPER_SADNESS = Isaac.GetPillEffectByName("Super Sadness")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_SUPER_SADNESS] = "PILLEFFECT_SUPER_SADNESS"
____exports.PillEffectCustom.PILLEFFECT_INVINCIBILITY = Isaac.GetPillEffectByName("Invincibility")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_INVINCIBILITY] = "PILLEFFECT_INVINCIBILITY"
____exports.PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS = Isaac.GetPillEffectByName("Really Bad Gas")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS] = "PILLEFFECT_REALLY_BAD_GAS"
____exports.PillEffectCustom.PILLEFFECT_AETHER = Isaac.GetPillEffectByName("Aether")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_AETHER] = "PILLEFFECT_AETHER"
____exports.PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES = Isaac.GetPillEffectByName("Walls Have Eyes")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES] = "PILLEFFECT_WALLS_HAVE_EYES"
____exports.PillEffectCustom.PILLEFFECT_BLADDER_INFECTION = Isaac.GetPillEffectByName("Bladder Infection")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_BLADDER_INFECTION] = "PILLEFFECT_BLADDER_INFECTION"
____exports.PillEffectCustom.PILLEFFECT_SCORCHED_EARTH = Isaac.GetPillEffectByName("Scorched Earth")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_SCORCHED_EARTH] = "PILLEFFECT_SCORCHED_EARTH"
____exports.PillEffectCustom.PILLEFFECT_FAMILIAR_FRENZY = Isaac.GetPillEffectByName("Familiar Frenzy")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_FAMILIAR_FRENZY] = "PILLEFFECT_FAMILIAR_FRENZY"
____exports.PillEffectCustom.PILLEFFECT_UNLOCK = Isaac.GetPillEffectByName("Unlock")
____exports.PillEffectCustom[____exports.PillEffectCustom.PILLEFFECT_UNLOCK] = "PILLEFFECT_UNLOCK"
____exports.SoundEffectCustom = {}
____exports.SoundEffectCustom.SOUND_WALNUT = Isaac.GetSoundIdByName("Walnut")
____exports.SoundEffectCustom[____exports.SoundEffectCustom.SOUND_WALNUT] = "SOUND_WALNUT"
____exports.CollectibleState = {}
____exports.CollectibleState.NORMAL = 0
____exports.CollectibleState[____exports.CollectibleState.NORMAL] = "NORMAL"
____exports.CollectibleState.RACING_PLUS_REPLACED = 1
____exports.CollectibleState[____exports.CollectibleState.RACING_PLUS_REPLACED] = "RACING_PLUS_REPLACED"
____exports.CollectibleState.DUPLICATED = 2
____exports.CollectibleState[____exports.CollectibleState.DUPLICATED] = "DUPLICATED"
return ____exports
end,
["constants"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
____exports.VERSION = "v0.0.8"
____exports.FAMILIAR_TEAR_DAMAGE = 0.33
____exports.FAMILIAR_TEAR_SCALE = 0.5
____exports.ITEM_STARTS = {{CollectibleType.COLLECTIBLE_MOMS_KNIFE}, {CollectibleType.COLLECTIBLE_IPECAC}, {CollectibleType.COLLECTIBLE_TECH_X}, {CollectibleType.COLLECTIBLE_EPIC_FETUS}, {CollectibleType.COLLECTIBLE_MAXS_HEAD}, {CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM}, {CollectibleType.COLLECTIBLE_DR_FETUS}, {CollectibleType.COLLECTIBLE_TECHNOLOGY}, {CollectibleType.COLLECTIBLE_POLYPHEMUS}, {CollectibleType.COLLECTIBLE_TECH_5}, {CollectibleType.COLLECTIBLE_20_20}, {CollectibleType.COLLECTIBLE_PROPTOSIS}, {CollectibleType.COLLECTIBLE_ISAACS_HEART}, {CollectibleType.COLLECTIBLE_JUDAS_SHADOW}, {CollectibleType.COLLECTIBLE_BRIMSTONE}, {CollectibleType.COLLECTIBLE_MAW_OF_VOID}, {CollectibleType.COLLECTIBLE_INCUBUS}, {CollectibleType.COLLECTIBLE_SACRED_HEART}, {CollectibleType.COLLECTIBLE_GODHEAD}, {CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT}, {CollectibleType.COLLECTIBLE_CRICKETS_BODY, CollectibleType.COLLECTIBLE_SAD_ONION}, {CollectibleType.COLLECTIBLE_MONSTROS_LUNG, CollectibleType.COLLECTIBLE_SAD_ONION}, {CollectibleType.COLLECTIBLE_DEATHS_TOUCH, CollectibleType.COLLECTIBLE_SAD_ONION}, {CollectibleType.COLLECTIBLE_DEAD_EYE, CollectibleType.COLLECTIBLE_APPLE}, {CollectibleType.COLLECTIBLE_JACOBS_LADDER, CollectibleType.COLLECTIBLE_THERES_OPTIONS}, {CollectibleType.COLLECTIBLE_POINTY_RIB, CollectibleType.COLLECTIBLE_POINTY_RIB}, {CollectibleType.COLLECTIBLE_CHOCOLATE_MILK, CollectibleType.COLLECTIBLE_STEVEN, CollectibleType.COLLECTIBLE_SAD_ONION}}
____exports.REMOVED_TRINKETS = {TrinketType.TRINKET_PURPLE_HEART, TrinketType.TRINKET_ROSARY_BEAD, TrinketType.TRINKET_CARTRIDGE, TrinketType.TRINKET_PULSE_WORM, TrinketType.TRINKET_MOMS_TOENAIL, TrinketType.TRINKET_BUTT_PENNY, TrinketType.TRINKET_MYSTERIOUS_CANDY, TrinketType.TRINKET_HOOK_WORM, TrinketType.TRINKET_BROKEN_ANKH, TrinketType.TRINKET_UMBILICAL_CORD, TrinketType.TRINKET_CHILDS_HEART, TrinketType.TRINKET_RUSTED_KEY, TrinketType.TRINKET_MATCH_STICK, TrinketType.TRINKET_LUCKY_TOE, TrinketType.TRINKET_CURSED_SKULL, TrinketType.TRINKET_ISAACS_FORK, TrinketType.TRINKET_SOUL, TrinketType.TRINKET_EVES_BIRD_FOOT, TrinketType.TRINKET_SHINY_ROCK, TrinketType.TRINKET_RAINBOW_WORM, TrinketType.TRINKET_TAPE_WORM, TrinketType.TRINKET_LAZY_WORM, TrinketType.TRINKET_CRACKED_DICE, TrinketType.TRINKET_FADED_POLAROID, TrinketType.TRINKET_BOBS_BLADDER, TrinketType.TRINKET_STUD_FINDER, TrinketType.TRINKET_ERROR, TrinketType.TRINKET_POKER_CHIP, TrinketType.TRINKET_BLISTER, TrinketType.TRINKET_SECOND_HAND, TrinketType.TRINKET_BLACK_FEATHER, TrinketType.TRINKET_MOMS_LOCKET, TrinketType.TRINKET_BROWN_CAP, TrinketType.TRINKET_USED_DIAPER, TrinketType.TRINKET_OUROBOROS_WORM, TrinketType.TRINKET_TONSIL, TrinketType.TRINKET_NOSE_GOBLIN, TrinketType.TRINKET_EQUALITY, TrinketType.TRINKET_BAG_LUNCH, TrinketType.TRINKET_LOST_CORK, TrinketType.TRINKET_CROW_HEART, TrinketType.TRINKET_DUCT_TAPE, TrinketType.TRINKET_LOCUST_OF_WRATH, TrinketType.TRINKET_BAT_WING, TrinketType.TRINKET_STEM_CELL, TrinketType.TRINKET_WOODEN_CROSS}
____exports.TWO_HEART_ITEMS = {CollectibleType.COLLECTIBLE_MAXS_HEAD, CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM, CollectibleType.COLLECTIBLE_DR_FETUS, CollectibleType.COLLECTIBLE_TECHNOLOGY, CollectibleType.COLLECTIBLE_CHOCOLATE_MILK, CollectibleType.COLLECTIBLE_MOMS_KNIFE, CollectibleType.COLLECTIBLE_BRIMSTONE, CollectibleType.COLLECTIBLE_IPECAC, CollectibleType.COLLECTIBLE_EPIC_FETUS, CollectibleType.COLLECTIBLE_POLYPHEMUS, CollectibleType.COLLECTIBLE_SACRED_HEART, CollectibleType.COLLECTIBLE_CRICKETS_BODY, CollectibleType.COLLECTIBLE_MONSTROS_LUNG, CollectibleType.COLLECTIBLE_DEATHS_TOUCH, CollectibleType.COLLECTIBLE_TECH_5, CollectibleType.COLLECTIBLE_20_20, CollectibleType.COLLECTIBLE_PROPTOSIS, CollectibleType.COLLECTIBLE_LIL_BRIMSTONE, CollectibleType.COLLECTIBLE_ISAACS_HEART, CollectibleType.COLLECTIBLE_JUDAS_SHADOW, CollectibleType.COLLECTIBLE_GODHEAD, CollectibleType.COLLECTIBLE_INCUBUS, CollectibleType.COLLECTIBLE_DEAD_EYE, CollectibleType.COLLECTIBLE_TECH_X, CollectibleType.COLLECTIBLE_MAW_OF_VOID, CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT, CollectibleType.COLLECTIBLE_JACOBS_LADDER, CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE, CollectibleType.COLLECTIBLE_PYRO, CollectibleType.COLLECTIBLE_ABADDON, CollectibleType.COLLECTIBLE_TINY_PLANET, CollectibleType.COLLECTIBLE_PURITY, CollectibleType.COLLECTIBLE_SUCCUBUS, CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5}
____exports.SHOP_PRICES = __TS__New(Map, {{CollectibleType.COLLECTIBLE_COMPASS, 15}, {CollectibleType.COLLECTIBLE_TREASURE_MAP, 15}, {CollectibleType.COLLECTIBLE_BLUE_MAP, 15}, {CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS, 15}, {CollectibleType.COLLECTIBLE_TELEPORT, 15}, {CollectibleType.COLLECTIBLE_DADS_KEY, 15}, {CollectibleType.COLLECTIBLE_BFFS, 15}, {CollectibleType.COLLECTIBLE_THERES_OPTIONS, 15}, {CollectibleType.COLLECTIBLE_UNDEFINED, 15}, {CollectibleType.COLLECTIBLE_DIPLOPIA, 15}, {CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY, 15}, {CollectibleTypeCustom.COLLECTIBLE_CATALOG, 15}, {CollectibleType.COLLECTIBLE_TRANSCENDENCE, 10}, {CollectibleType.COLLECTIBLE_STEAM_SALE, 10}, {CollectibleType.COLLECTIBLE_BLANK_CARD, 10}, {CollectibleType.COLLECTIBLE_BLUE_BOX, 10}, {CollectibleType.COLLECTIBLE_UNICORN_STUMP, 10}, {CollectibleType.COLLECTIBLE_PLACEBO, 10}, {CollectibleType.COLLECTIBLE_CHARGED_BABY, 10}, {CollectibleType.COLLECTIBLE_RESTOCK, 10}, {CollectibleType.COLLECTIBLE_VENTRICLE_RAZOR, 10}, {CollectibleType.COLLECTIBLE_VOID, 10}, {CollectibleType.COLLECTIBLE_PAUSE, 10}, {CollectibleType.COLLECTIBLE_POTATO_PEELER, 10}, {CollectibleType.COLLECTIBLE_EDENS_SOUL, 10}, {CollectibleType.COLLECTIBLE_MYSTERY_GIFT, 10}, {CollectibleType.COLLECTIBLE_MOVING_BOX, 10}, {CollectibleType.COLLECTIBLE_MR_ME, 10}, {CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR, 10}, {CollectibleType.COLLECTIBLE_BOOK_OF_SHADOWS, 5}, {CollectibleType.COLLECTIBLE_BATTERY, 5}, {CollectibleType.COLLECTIBLE_PHD, 5}, {CollectibleType.COLLECTIBLE_XRAY_VISION, 5}, {CollectibleType.COLLECTIBLE_DECK_OF_CARDS, 5}, {CollectibleType.COLLECTIBLE_SPELUNKER_HAT, 5}, {CollectibleType.COLLECTIBLE_MOMS_BOTTLE_PILLS, 5}, {CollectibleType.COLLECTIBLE_NINE_VOLT, 5}, {CollectibleType.COLLECTIBLE_HABIT, 5}, {CollectibleType.COLLECTIBLE_SHARP_PLUG, 5}, {CollectibleType.COLLECTIBLE_PIGGY_BANK, 5}, {CollectibleType.COLLECTIBLE_CONTRACT_FROM_BELOW, 5}, {CollectibleType.COLLECTIBLE_HIVE_MIND, 5}, {CollectibleType.COLLECTIBLE_STARTER_DECK, 5}, {CollectibleType.COLLECTIBLE_LITTLE_BAGGY, 5}, {CollectibleType.COLLECTIBLE_HOW_TO_JUMP, 5}, {CollectibleType.COLLECTIBLE_MORE_OPTIONS, 5}, {CollectibleType.COLLECTIBLE_SACK_HEAD, 5}, {CollectibleType.COLLECTIBLE_MOMS_BOX, 5}, {CollectibleType.COLLECTIBLE_POLYDACTYLY, 5}, {CollectibleType.COLLECTIBLE_BELLY_BUTTON, 5}, {CollectibleType.COLLECTIBLE_D1, 5}, {CollectibleType.COLLECTIBLE_SMELTER, 5}, {CollectibleType.COLLECTIBLE_COMPOST, 5}, {CollectibleType.COLLECTIBLE_YO_LISTEN, 5}, {CollectibleType.COLLECTIBLE_COUPON, 5}, {CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED, 5}, {CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION, 5}})
____exports.FLY_ENTITIES = {EntityType.ENTITY_FLY, EntityType.ENTITY_POOTER, EntityType.ENTITY_ATTACKFLY, EntityType.ENTITY_BOOMFLY, EntityType.ENTITY_SUCKER, EntityType.ENTITY_DUKE, EntityType.ENTITY_MOTER, EntityType.ENTITY_FLY_L2, EntityType.ENTITY_RING_OF_FLIES, EntityType.ENTITY_FULL_FLY, EntityType.ENTITY_DART_FLY, EntityType.ENTITY_SWARM, EntityType.ENTITY_HUSH_FLY}
____exports.SPIDER_ENTITIES = {EntityType.ENTITY_HOPPER, EntityType.ENTITY_SPIDER, EntityType.ENTITY_BIGSPIDER, EntityType.ENTITY_WIDOW, EntityType.ENTITY_DADDYLONGLEGS, EntityType.ENTITY_BABY_LONG_LEGS, EntityType.ENTITY_CRAZY_LONG_LEGS, EntityType.ENTITY_SPIDER_L2, EntityType.ENTITY_WALL_CREEP, EntityType.ENTITY_RAGE_CREEP, EntityType.ENTITY_BLIND_CREEP, EntityType.ENTITY_RAGLING, EntityType.ENTITY_TICKING_SPIDER, EntityType.ENTITY_BLISTER, EntityType.ENTITY_THE_THING}
____exports.TECHNOLOGY_EXCEPTION_ITEMS = {CollectibleType.COLLECTIBLE_DR_FETUS, CollectibleType.COLLECTIBLE_MOMS_KNIFE, CollectibleType.COLLECTIBLE_BRIMSTONE, CollectibleType.COLLECTIBLE_IPECAC, CollectibleType.COLLECTIBLE_EPIC_FETUS, CollectibleType.COLLECTIBLE_TINY_PLANET, CollectibleType.COLLECTIBLE_TECH_X}
____exports.ISAACS_HEART_BROKEN_ITEMS = {CollectibleType.COLLECTIBLE_BRIMSTONE, CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE, CollectibleType.COLLECTIBLE_MULTIDIMENSIONAL_BABY}
____exports.POKE_GO_EXCEPTION_ENTITIES = {EntityType.ENTITY_SHOPKEEPER, EntityType.ENTITY_FIREPLACE, EntityType.ENTITY_STONEHEAD, EntityType.ENTITY_POKY, EntityType.ENTITY_ETERNALFLY, EntityType.ENTITY_CONSTANT_STONE_SHOOTER, EntityType.ENTITY_BRIMSTONE_HEAD, EntityType.ENTITY_SWINGER, EntityType.ENTITY_WALL_HUGGER, EntityType.ENTITY_GAPING_MAW, EntityType.ENTITY_BROKEN_GAPING_MAW, EntityType.ENTITY_SWARM, EntityType.ENTITY_PITFALL}
return ____exports
end,
["types.GlobalsRunHealth"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
end,
["types.GlobalsRunLastHealth"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
end,
["types.GlobalsRunLevel"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.default = (function()
    ____exports.default = __TS__Class()
    local GlobalsRunLevel = ____exports.default
    GlobalsRunLevel.name = "GlobalsRunLevel"
    function GlobalsRunLevel.prototype.____constructor(self)
        self.doubleItems = false
        self.usedDiceRoom = false
    end
    return GlobalsRunLevel
end)()
return ____exports
end,
["types.GlobalsRunPills"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
end,
["types.Shockwave"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
end,
["types.Tear"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
return ____exports
end,
["types.GlobalsRunRoom"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
____exports.default = (function()
    ____exports.default = __TS__Class()
    local GlobalsRunRoom = ____exports.default
    GlobalsRunRoom.name = "GlobalsRunRoom"
    function GlobalsRunRoom.prototype.____constructor(self)
        self.doubleItemsFrame = 0
        self.softlock = false
        self.knifeFlying = __TS__New(Map)
        self.knifePositions = __TS__New(Map)
        self.mongoBabyTears = {}
        self.fartingBabyShockwaves = {}
    end
    return GlobalsRunRoom
end)()
return ____exports
end,
["types.GlobalsRun"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____GlobalsRunLevel = require("types.GlobalsRunLevel")
local GlobalsRunLevel = ____GlobalsRunLevel.default
local ____GlobalsRunRoom = require("types.GlobalsRunRoom")
local GlobalsRunRoom = ____GlobalsRunRoom.default
____exports.default = (function()
    ____exports.default = __TS__Class()
    local GlobalsRun = ____exports.default
    GlobalsRun.name = "GlobalsRun"
    function GlobalsRun.prototype.____constructor(self)
        self.randomSeed = 0
        self.tearCounter = 0
        self.currentFloor = 0
        self.currentFloorType = 0
        self.currentFloorFrame = 0
        self.level = __TS__New(GlobalsRunLevel)
        self.currentRoomClearState = true
        self.room = __TS__New(GlobalsRunRoom)
        self.pickingUpItem = 0
        self.pickingUpItemRoom = 0
        self.pickingUpItemType = ItemType.ITEM_NULL
        self.dealingExtraDamage = false
        self.familiarMultiShot = 0
        self.familiarMultiShotVelocity = Vector(0, 0)
        self.rouletteTableRNG = 0
        self.monstroCounters = 0
        self.monstroFrame = 0
        self.wafer = false
        self.waferCounters = 0
        self.knifeCooldownFrames = 0
        self.nineVoltFrame = 0
        self.spawningDeadBird = false
        self.blackBeanEndFrame = 0
        self.abelDoubleTear = false
        self.fannyPackRNG = 0
        self.piggyBankRNG = 0
        self.technologyAdded2020 = false
        self.spawningIsaacsHeartLaser = false
        self.judasShadow = false
        self.holyMantle = false
        self.wizDoubleTear = false
        self.chargedBabyCounters = 0
        self.fartingBabyCounters = 0
        self.blackPowderActive = false
        self.brownNuggetCounters = 0
        self.brownNuggetFrame = 0
        self.walnutCounters = 0
        self.spawningRestock = false
        self.strabismusDoubleTear = false
        self.catalogRNG = 0
        self.etherealPennyRNG = 0
        self.numCoins = 0
        self.wheelOfFortuneRNG = 0
        self.sunCardRNG = 0
        self.pills = {
            effects = __TS__New(Map),
            damageUp = 0,
            tearDelayDown = 0,
            superSadness = 0,
            invincibility = 0,
            reallyBadGas = 0,
            aether = 0,
            aetherAngle = 0,
            wallsHaveEyes = 0,
            wallsHaveEyesShooting = false,
            bladderInfection = 0,
            scorchedEarth = 0,
            familiarFrenzy = 0
        }
        self.health = {hearts = 0, maxHearts = 0, soulHearts = 0, blackHearts = 0, boneHearts = 0, changedOnThisFrame = false}
        self.lastHealth = {hearts = 0, maxHearts = 0, soulHearts = 0, blackHearts = 0, boneHearts = 0}
        self.transformations = __TS__New(Map)
    end
    function GlobalsRun.prototype.init(self, startSeed)
        self.randomSeed = startSeed
        self.rouletteTableRNG = startSeed
        self.fannyPackRNG = startSeed
        self.piggyBankRNG = startSeed
        self.catalogRNG = startSeed
        self.etherealPennyRNG = startSeed
        self.wheelOfFortuneRNG = startSeed
        do
            local i = 0
            while i < 14 do
                self.transformations:set(i, false)
                i = i + 1
            end
        end
    end
    return GlobalsRun
end)()
return ____exports
end,
["types.Globals"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____GlobalsRun = require("types.GlobalsRun")
local GlobalsRun = ____GlobalsRun.default
____exports.default = (function()
    ____exports.default = __TS__Class()
    local Globals = ____exports.default
    Globals.name = "Globals"
    function Globals.prototype.____constructor(self)
        self.racingPlusEnabled = RacingPlusGlobals ~= nil
        self.g = Game(nil)
        self.l = Game(nil):GetLevel()
        self.r = Game(nil):GetRoom()
        self.p = Isaac.GetPlayer(0)
        self.seeds = Game(nil):GetSeeds()
        self.itemPool = Game(nil):GetItemPool()
        self.itemConfig = Isaac.GetItemConfig()
        self.sfx = SFXManager(nil)
        self.zeroVector = Vector(0, 0)
        self.run = __TS__New(GlobalsRun)
    end
    return Globals
end)()
return ____exports
end,
["globals"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____Globals = require("types.Globals")
local Globals = ____Globals.default
local globals = __TS__New(Globals)
____exports.default = globals
RacingPlusRebalancedGlobals = globals
return ____exports
end,
["debug"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.default(self)
    Isaac.DebugString("Racing+ Rebalanced debug function activated.")
    g.run.level.doubleItems = true
end
return ____exports
end,
["callbacks.entityTakeDmgNPC"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local spearOfDestiny
function spearOfDestiny(self, npc, damageSource, damageCountdownFrames)
    if (damageSource.Type == EntityType.ENTITY_EFFECT) and (damageSource.Variant == EffectVariant.SPEAR_OF_DESTINY) then
        local damage = g.p.Damage * 3
        g.run.dealingExtraDamage = true
        npc:TakeDamage(
            damage,
            0,
            EntityRef(g.p),
            damageCountdownFrames
        )
        g.run.dealingExtraDamage = false
        return false
    end
    return true
end
function ____exports.default(self, npc, _damageAmount, _damageFlags, damageSource, damageCountdownFrames)
    spearOfDestiny(nil, npc, damageSource, damageCountdownFrames)
    return true
end
return ____exports
end,
["misc"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.hasNoHealth(self)
    return ((g.p:GetHearts() == 0) and (g.p:GetSoulHearts() == 0)) and (g.p:GetBoneHearts() == 0)
end
function ____exports.getRandomOffsetPosition(self, position, offsetSize, seed)
    math.randomseed(seed)
    local offsetDirection = math.random(1, 4)
    local offsetX
    local offsetY
    if offsetDirection == 1 then
        offsetX = offsetSize
        offsetY = offsetSize
    elseif offsetDirection == 2 then
        offsetX = offsetSize
        offsetY = offsetSize * -1
    elseif offsetDirection == 3 then
        offsetX = offsetSize * -1
        offsetY = offsetSize
    elseif offsetDirection == 4 then
        offsetX = offsetSize * -1
        offsetY = offsetSize * -1
    else
        error(
            __TS__New(Error, "Unknown offset direction."),
            0
        )
    end
    return Vector(position.X + offsetX, position.Y + offsetY)
end
function ____exports.getRoomIndex(self)
    local roomIndex = g.l:GetCurrentRoomDesc().SafeGridIndex
    if roomIndex < 0 then
        return g.l:GetCurrentRoomIndex()
    end
    return roomIndex
end
function ____exports.getTotalItemCount(self)
    local id = CollectibleType.NUM_COLLECTIBLES - 1
    local step = 16
    while step > 0 do
        if g.itemConfig:GetCollectible(id + step) then
            id = id + step
        else
            step = math.floor(step / 2)
        end
    end
    return id
end
function ____exports.getVelocityFromAimDirection(self)
    local velocity = g.p:GetAimDirection()
    return velocity:__mul(g.p.ShotSpeed * 10)
end
function ____exports.gridToPos(self, origX, origY)
    local x = origX + 1
    local y = origY + 1
    return g.r:GetGridPosition(
        (y * g.r:GetGridWidth()) + x
    )
end
function ____exports.hasFlag(self, flags, flag)
    return (flags & flag) ~= 0
end
function ____exports.incrementRNG(self, seed)
    local rng = RNG()
    rng:SetSeed(seed, 35)
    rng:Next()
    local newSeed = rng:GetSeed()
    return newSeed
end
function ____exports.isOnTearBuild(self)
    return (((((not g.p:HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS)) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY))) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_MOMS_KNIFE))) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE))) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS))) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X))
end
function ____exports.killIfNoHealth(self)
    if ____exports.hasNoHealth(nil) then
        g.p:Kill()
    end
end
function ____exports.removeAllEntities(self)
    for ____, entity in ipairs(
        Isaac.GetRoomEntities()
    ) do
        if ((((entity:ToNPC() ~= nil) or (entity.Type == EntityType.ENTITY_PICKUP)) or (entity.Type == EntityType.ENTITY_SLOT)) or ((entity.Type == EntityType.ENTITY_EFFECT) and (entity.Variant == EffectVariant.DEVIL))) or ((entity.Type == EntityType.ENTITY_EFFECT) and (entity.Variant == EffectVariant.DICE_FLOOR)) then
            entity:Remove()
        end
    end
    g.r:SetClear(true)
end
function ____exports.removeAllGridEntities(self)
    local gridSize = g.r:GetGridSize()
    do
        local i = 1
        while i <= gridSize do
            local gridEntity = g.r:GetGridEntity(i)
            if gridEntity ~= nil then
                if (gridEntity:GetSaveState().Type ~= GridEntityType.GRID_WALL) and (gridEntity:GetSaveState().Type ~= GridEntityType.GRID_DOOR) then
                    g.r:RemoveGridEntity(i, 0, false)
                end
            end
            i = i + 1
        end
    end
end
function ____exports.removeSpecificEntities(self, entityType, variant)
    local entities = Isaac.FindByType(entityType, variant, -1, false, false)
    for ____, entity in ipairs(entities) do
        entity:Remove()
    end
end
function ____exports.setHealth(self, hearts, maxHearts, soulHearts, blackHearts, boneHearts)
    g.p:AddMaxHearts(-24, true)
    g.p:AddSoulHearts(-24)
    g.p:AddBoneHearts(-24)
    g.p:AddMaxHearts(maxHearts, true)
    g.p:AddBoneHearts(boneHearts)
    g.p:AddHearts(hearts)
    do
        local i = 0
        while i < soulHearts do
            local bitPosition = math.floor(i / 2)
            local bit = (blackHearts & (1 << bitPosition)) >> bitPosition
            if bit == 0 then
                g.p:AddSoulHearts(1)
            else
                g.p:AddBlackHearts(1)
            end
            i = i + 1
        end
    end
end
function ____exports.setHealthFromLastFrame(self)
    ____exports.setHealth(nil, g.run.lastHealth.hearts, g.run.lastHealth.maxHearts, g.run.lastHealth.soulHearts, g.run.lastHealth.blackHearts, g.run.lastHealth.boneHearts)
end
return ____exports
end,
["callbacks.entityTakeDmgPlayer"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local SoundEffectCustom = ____enums_2Ecustom.SoundEffectCustom
local TrinketTypeCustom = ____enums_2Ecustom.TrinketTypeCustom
local theWafer, infestation, theBlackBean, spiderBaby, piggyBank, techX, myShadow, fannyPackImproved, walnut
function theWafer(self, player)
    if g.run.waferCounters == 0 then
        return
    end
    local ____obj, ____index = g.run, "waferCounters"
    ____obj[____index] = ____obj[____index] - 1
    if g.run.waferCounters == 0 then
        player:RemoveCollectible(CollectibleType.COLLECTIBLE_WAFER)
    end
end
function infestation(self, player)
    if not player:HasCollectible(CollectibleType.COLLECTIBLE_INFESTATION) then
        return
    end
    local numFlies = 20
    player:AddBlueFlies(numFlies, player.Position, nil)
end
function theBlackBean(self, player)
    if not player:HasCollectible(CollectibleType.COLLECTIBLE_BLACK_BEAN) then
        return
    end
    g.run.blackBeanEndFrame = g.g:GetFrameCount() + 300
end
function spiderBaby(self, player)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_SPIDERBABY) then
        return
    end
    local numSpiders = 20
    do
        local i = 0
        while i < (numSpiders - 2) do
            local randomPosition = g.r:GetRandomPosition(0)
            player:ThrowBlueSpider(player.Position, randomPosition)
            i = i + 1
        end
    end
end
function piggyBank(self, player)
    if not player:HasCollectible(CollectibleType.COLLECTIBLE_PIGGY_BANK) then
        return
    end
    do
        local i = 0
        while i < 4 do
            g.run.piggyBankRNG = misc:incrementRNG(g.run.piggyBankRNG)
            g.g:Spawn(
                EntityType.ENTITY_PICKUP,
                PickupVariant.PICKUP_COIN,
                g.p.Position,
                RandomVector(nil):__mul(2.5),
                g.p,
                0,
                g.run.piggyBankRNG
            )
            i = i + 1
        end
    end
end
function techX(self, player, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    if not player:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X) then
        return
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS) then
        return
    end
    g.run.dealingExtraDamage = true
    player:TakeDamage(damageAmount, damageFlags, damageSource, damageCountdownFrames)
    g.run.dealingExtraDamage = false
end
function myShadow(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_MY_SHADOW) then
        return
    end
    local numBlackChargers = 20
    do
        local i = 1
        while i < (numBlackChargers - 1) do
            local position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
            local charger = g.g:Spawn(EntityType.ENTITY_CHARGER, 0, position, g.zeroVector, nil, 1, 0)
            charger:AddEntityFlags(EntityFlag.FLAG_CHARM)
            i = i + 1
        end
    end
end
function fannyPackImproved(self, player)
    if not player:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED) then
        return
    end
    g.run.fannyPackRNG = misc:incrementRNG(g.run.fannyPackRNG)
    math.randomseed(g.run.fannyPackRNG)
    local pickupRoll = math.random(1, 11)
    g.run.fannyPackRNG = misc:incrementRNG(g.run.fannyPackRNG)
    local position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
    local ____switch26 = pickupRoll
    if ____switch26 == 1 then
        goto ____switch26_case_0
    elseif ____switch26 == 2 then
        goto ____switch26_case_1
    elseif ____switch26 == 3 then
        goto ____switch26_case_2
    elseif ____switch26 == 4 then
        goto ____switch26_case_3
    elseif ____switch26 == 5 then
        goto ____switch26_case_4
    elseif ____switch26 == 6 then
        goto ____switch26_case_5
    elseif ____switch26 == 7 then
        goto ____switch26_case_6
    elseif ____switch26 == 8 then
        goto ____switch26_case_7
    elseif ____switch26 == 9 then
        goto ____switch26_case_8
    elseif ____switch26 == 10 then
        goto ____switch26_case_9
    elseif ____switch26 == 11 then
        goto ____switch26_case_10
    end
    goto ____switch26_case_default
    ::____switch26_case_0::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_HEART, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_1::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COIN, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_2::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_KEY, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_3::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_BOMB, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_4::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_CHEST, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_5::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_GRAB_BAG, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_6::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_LIL_BATTERY, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_7::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_PILL, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_8::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_TAROTCARD, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_9::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_TRINKET, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_10::
    do
        do
            g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, position, g.zeroVector, nil, 0, g.run.fannyPackRNG)
            goto ____switch26_end
        end
    end
    ::____switch26_case_default::
    do
        do
            error(
                __TS__New(
                    Error,
                    ("Unknown pickup case of " .. tostring(pickupRoll)) .. "."
                ),
                0
            )
        end
    end
    ::____switch26_end::
end
function walnut(self, player, damageFlags)
    local startSeed = g.seeds:GetStartSeed()
    if not player:HasTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED) then
        return
    end
    if not misc:hasFlag(damageFlags, DamageFlag.DAMAGE_EXPLOSION) then
        return
    end
    local ____obj, ____index = g.run, "walnutCounters"
    ____obj[____index] = ____obj[____index] + 1
    if g.run.walnutCounters == 3 then
        g.run.walnutCounters = 0
        g.p:TryRemoveTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED)
        local position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
        local subType = g.itemPool:GetCollectible(ItemPoolType.POOL_DEVIL, true, startSeed)
        g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, position, g.zeroVector, nil, subType, startSeed)
        g.sfx:Play(SoundEffectCustom.SOUND_WALNUT, 2, 0, false, 1)
    end
end
function ____exports.default(self, player, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    if g.run.pills.invincibility ~= 0 then
        return false
    end
    if (damageSource.Type == EntityType.ENTITY_FAMILIAR) and (((damageSource.Variant == FamiliarVariant.BLUE_FLY) or (damageSource.Variant == FamiliarVariant.BBF)) or (damageSource.Variant == FamiliarVariant.BOBS_BRAIN)) then
        return false
    end
    theWafer(nil, player)
    infestation(nil, player)
    theBlackBean(nil, player)
    spiderBaby(nil, player)
    piggyBank(nil, player)
    techX(nil, player, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    myShadow(nil)
    fannyPackImproved(nil, player)
    walnut(nil, player, damageFlags)
    return true
end
return ____exports
end,
["callbacks.entityTakeDmg"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____entityTakeDmgNPC = require("callbacks.entityTakeDmgNPC")
local entityTakeDmgNPC = ____entityTakeDmgNPC.default
local ____entityTakeDmgPlayer = require("callbacks.entityTakeDmgPlayer")
local entityTakeDmgPlayer = ____entityTakeDmgPlayer.default
function ____exports.main(self, entity, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    if g.run.dealingExtraDamage then
        return false
    end
    local player = entity:ToPlayer()
    if player ~= nil then
        return entityTakeDmgPlayer(nil, player, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    end
    local npc = entity:ToNPC()
    if npc ~= nil then
        return entityTakeDmgNPC(nil, npc, damageAmount, damageFlags, damageSource, damageCountdownFrames)
    end
    return true
end
return ____exports
end,
["callbacks.evaluateCache"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local TINY_PLANET_EXCEPTION_ITEMS, damageItems, damageTrinkets, damagePills, damageGlobalPenalty, fireDelayItems, fireDelayPills, shotSpeedItems, speedItems, luckItems, hasTinyPlanetExceptionItem
function damageItems(self, player)
    if player:HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS) then
        player.Damage = player.Damage * 1.2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_IPECAC) then
        player.Damage = player.Damage * 0.8
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_MOMS_KNIFE) and (not player:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS)) then
        player.Damage = player.Damage * 0.7
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) and (not hasTinyPlanetExceptionItem(nil)) then
        player.Damage = player.Damage * 1.5
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
        player.Damage = player.Damage * 0.8
    end
    if ((player:HasCollectible(CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE) and (not player:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS))) and (not player:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X))) and (not player:HasCollectible(CollectibleType.COLLECTIBLE_HAEMOLACRIA)) then
        player.Damage = player.Damage * 3
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_SOY_MILK) then
        player.Damage = player.Damage * 3.5
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_GODHEAD) then
        player.Damage = player.Damage * 0.9
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER) and g.run.blackPowderActive then
        player.Damage = player.Damage * 1.5
    end
    if player:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED) then
        local hearts = player:GetHearts()
        local soulHearts = player:GetSoulHearts()
        local boneHearts = player:GetBoneHearts()
        local numHits = (hearts + soulHearts) + boneHearts
        if numHits == 1 then
            player.Damage = player.Damage * 2
        elseif numHits == 2 then
            player.Damage = player.Damage * 1.5
        elseif numHits == 3 then
            player.Damage = player.Damage * 1.25
        elseif numHits == 4 then
            player.Damage = player.Damage * 1.125
        end
    end
end
function damageTrinkets(self, player)
    if player:HasTrinket(TrinketType.TRINKET_RING_WORM) then
        player.Damage = player.Damage * 1.25
    end
end
function damagePills(self, player)
    player.Damage = player.Damage + g.run.pills.damageUp
end
function damageGlobalPenalty(self, player)
    local stage = g.l:GetStage()
    local adjustedStage = ((stage >= 9) and (stage - 1)) or stage
    local stagePenalty = ((adjustedStage - 1) / 9) * 0.3
    player.Damage = player.Damage * (1 - stagePenalty)
end
function fireDelayItems(self, player)
    local hearts = player:GetHearts()
    if player:HasCollectible(CollectibleType.COLLECTIBLE_INNER_EYE) and (not player:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_MUTANT_SPIDER_INNER_EYE)) then
        player.MaxFireDelay = player.MaxFireDelay - 4
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_MY_REFLECTION) then
        player.MaxFireDelay = player.MaxFireDelay - 2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_CUPIDS_ARROW) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) and (not hasTinyPlanetExceptionItem(nil)) then
        player.MaxFireDelay = player.MaxFireDelay - 4
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
        player.MaxFireDelay = math.ceil(player.MaxFireDelay * 2)
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_EVES_MASCARA) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_STRANGE_ATTRACTOR) then
        player.MaxFireDelay = player.MaxFireDelay - 2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_THE_WIZ) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_MARKED) then
        player.MaxFireDelay = player.MaxFireDelay - 2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_EXPLOSIVO) then
        player.MaxFireDelay = player.MaxFireDelay - 2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_KIDNEY_STONE) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_DARK_PRINCESS_CROWN) and (hearts == 2) then
        player.MaxFireDelay = player.MaxFireDelay - 2
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_POP) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_HAEMOLACRIA) then
        player.MaxFireDelay = player.MaxFireDelay - 14
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_FLAT_STONE) then
        player.MaxFireDelay = player.MaxFireDelay - 1
    end
end
function fireDelayPills(self, player)
    player.MaxFireDelay = player.MaxFireDelay - g.run.pills.tearDelayDown
    if g.run.pills.superSadness ~= 0 then
        player.MaxFireDelay = player.MaxFireDelay - 6
    end
end
function shotSpeedItems(self, player)
    if player:HasCollectible(CollectibleType.COLLECTIBLE_EVES_MASCARA) then
        player.ShotSpeed = player.ShotSpeed + 0.5
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_TRISAGION) then
        player.ShotSpeed = player.ShotSpeed - 0.35
    end
end
function speedItems(self, player)
    if player:HasCollectible(CollectibleType.COLLECTIBLE_VIRUS) then
        player.MoveSpeed = player.MoveSpeed + 0.1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_ODD_MUSHROOM_DAMAGE) then
        player.MoveSpeed = player.MoveSpeed + 0.1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_TAURUS) then
        player.MoveSpeed = player.MoveSpeed + 0.5
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_LEO) then
        player.MoveSpeed = player.MoveSpeed + 0.1
    end
    if player:HasCollectible(CollectibleType.COLLECTIBLE_KIDNEY_STONE) then
        player.MoveSpeed = player.MoveSpeed + 0.2
    end
end
function luckItems(self, player)
    if player:HasCollectible(CollectibleType.COLLECTIBLE_LOKIS_HORNS) then
        player.Luck = player.Luck + 7
    end
end
function hasTinyPlanetExceptionItem(self)
    for ____, item in ipairs(TINY_PLANET_EXCEPTION_ITEMS) do
        if g.p:HasCollectible(item) then
            return true
        end
    end
    return false
end
TINY_PLANET_EXCEPTION_ITEMS = {CollectibleType.COLLECTIBLE_EPIC_FETUS, CollectibleType.COLLECTIBLE_LUDOVICO_TECHNIQUE, CollectibleType.COLLECTIBLE_TECH_X}
function ____exports.damage(self, player)
    damageItems(nil, player)
    damageTrinkets(nil, player)
    damagePills(nil, player)
    damageGlobalPenalty(nil, player)
end
function ____exports.fireDelay(self, player)
    fireDelayItems(nil, player)
    fireDelayPills(nil, player)
end
function ____exports.shotSpeed(self, player)
    shotSpeedItems(nil, player)
end
function ____exports.speed(self, player)
    speedItems(nil, player)
end
function ____exports.luck(self, player)
    luckItems(nil, player)
end
return ____exports
end,
["callbacks.executeCmd"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____debug = require("debug")
local ____debug = ____debug.default
function ____exports.main(self, command)
    if command == "d" then
        ____debug(nil)
    end
end
return ____exports
end,
["callbacks.familiarInit"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.littleChubby(self, familiar)
    local damage = 3.5 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.deadBird(self, familiar)
    if g.run.spawningDeadBird then
        return
    end
    local damage = 2 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
    do
        local i = 0
        while i < 4 do
            g.run.spawningDeadBird = true
            local bird = g.g:Spawn(familiar.Type, familiar.Variant, g.p.Position, g.zeroVector, g.p, familiar.SubType, familiar.InitSeed)
            bird.CollisionDamage = damage
            g.run.spawningDeadBird = true
            i = i + 1
        end
    end
end
function ____exports.daddyLonglegs(self, familiar)
    local damage = 20 + (g.p.Damage * 3)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.sacrificialDagger(self, familiar)
    local damage = 8.25
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.leech(self, familiar)
    local damage = 1.5 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.lilHaunt(self, familiar)
    local damage = 2 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.blueBabysOnlyFriend(self, familiar)
    local damage = 2.5 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.gemini(self, familiar)
    local damage = 3 + g.p.Damage
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.lilGurdy(self, familiar)
    local damage = 6 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.bumbo(self, familiar)
    familiar.Coins = 25
end
function ____exports.bigChubby(self, familiar)
    local damage = 2.7 + (g.p.Damage * 0.25)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
function ____exports.disableVanillaShooting(self, familiar)
    familiar.FireCooldown = 1000000
end
function ____exports.damage7(self, familiar)
    local damage = 7
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    familiar.CollisionDamage = damage
end
return ____exports
end,
["callbacks.NPCUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local FLY_ENTITIES = ____constants.FLY_ENTITIES
local SPIDER_ENTITIES = ____constants.SPIDER_ENTITIES
local ____globals = require("globals")
local g = ____globals.default
local skatole, burstingSack, delirious, removeCharm, checkTemporaryCharm, removeConfusion, removeFear, fadeFriendly
function skatole(self, npc)
    if (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_SKATOLE)) or npc:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) then
        return
    end
    if __TS__ArrayIncludes(FLY_ENTITIES, npc.Type) then
        npc:AddEntityFlags(EntityFlag.FLAG_CHARM)
        npc:AddEntityFlags(EntityFlag.FLAG_FRIENDLY)
        npc:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
    end
end
function burstingSack(self, npc)
    if (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_BURSTING_SACK)) or npc:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) then
        return
    end
    if __TS__ArrayIncludes(SPIDER_ENTITIES, npc.Type) then
        npc:AddEntityFlags(EntityFlag.FLAG_CHARM)
        npc:AddEntityFlags(EntityFlag.FLAG_FRIENDLY)
        npc:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
    end
end
function delirious(self, npc)
    if npc:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) and (not npc:HasEntityFlags(EntityFlag.FLAG_PERSISTENT)) then
        npc:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
    end
end
function removeCharm(self, npc)
    if npc:HasEntityFlags(EntityFlag.FLAG_CHARM) and npc:IsBoss() then
        npc:ClearEntityFlags(EntityFlag.FLAG_CHARM)
    end
end
function checkTemporaryCharm(self, npc)
    if (((not npc:HasEntityFlags(EntityFlag.FLAG_CHARM)) or npc:IsBoss()) or npc:HasEntityFlags(EntityFlag.FLAG_FRIENDLY)) or npc:HasEntityFlags(EntityFlag.FLAG_PERSISTENT) then
        return
    end
    npc:AddEntityFlags(EntityFlag.FLAG_FRIENDLY)
    npc:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
    if npc:IsChampion() then
        local newNPC = g.g:Spawn(npc.Type, npc.Variant, npc.Position, npc.Velocity, npc.SpawnerEntity, npc.SubType, 0)
        newNPC:AddEntityFlags(EntityFlag.FLAG_FRIENDLY)
        newNPC:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
        npc:Remove()
    end
end
function removeConfusion(self, npc)
    if npc:HasEntityFlags(EntityFlag.FLAG_CONFUSION) then
        npc:ClearEntityFlags(EntityFlag.FLAG_CONFUSION)
    end
end
function removeFear(self, npc)
    if npc:HasEntityFlags(EntityFlag.FLAG_FEAR) then
        npc:ClearEntityFlags(EntityFlag.FLAG_FEAR)
    end
end
function fadeFriendly(self, npc)
    if npc:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) then
        ____exports.fade(nil, npc)
    end
end
function ____exports.fade(self, entity)
    local color = entity:GetColor()
    local fadeAmount = 0.25
    local newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0)
    entity:SetColor(newColor, 0, 0, true, true)
end
function ____exports.main(self, npc)
    skatole(nil, npc)
    burstingSack(nil, npc)
    delirious(nil, npc)
    removeCharm(nil, npc)
    checkTemporaryCharm(nil, npc)
    removeConfusion(nil, npc)
    removeFear(nil, npc)
    fadeFriendly(nil, npc)
end
return ____exports
end,
["callbacks.familiarUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local NPCUpdate = require("callbacks.NPCUpdate")
function ____exports.leech(self, familiar)
    NPCUpdate:fade(familiar)
end
function ____exports.yoListen(self, familiar)
    if (familiar.FrameCount % 5) == 0 then
        familiar.Velocity = familiar.Velocity:__mul(1.5)
    end
    if (((familiar.Velocity.X > -0.5) and (familiar.Velocity.X < 0.5)) and (familiar.Velocity.Y > -0.5)) and (familiar.Velocity.Y < 0.5) then
        local gridEntity = g.r:GetGridEntityFromPos(familiar.Position)
        if gridEntity ~= nil then
            gridEntity:Destroy(true)
        end
    end
end
function ____exports.preventStacking(self, familiar)
    local familiars = Isaac.FindByType(familiar.Type, familiar.Variant, -1, false, false)
    for ____, familiar2 in ipairs(familiars) do
        if (familiar.Position:Distance(familiar2.Position) <= 1) and (familiar.Index < familiar2.Index) then
            familiar2.Position = misc:getRandomOffsetPosition(familiar2.Position, 8, familiar2.InitSeed)
        end
    end
end
return ____exports
end,
["callbacks.getCard"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local REPLACEMENT_CARDS = {Card.CARD_CHAOS, Card.CARD_CREDIT, Card.CARD_SUICIDE_KING, Card.CARD_GET_OUT_OF_JAIL, Card.CARD_EMERGENCY_CONTACT, Card.CARD_HOLY, Card.CARD_HUGE_GROWTH, Card.CARD_ANCIENT_RECALL, Card.CARD_ERA_WALK}
function ____exports.main(self, rng, card)
    if (card ~= Card.CARD_RULES) and (card ~= Card.CARD_HUMANITY) then
        return nil
    end
    math.randomseed(
        rng:GetSeed()
    )
    local randomIndex = math.random(0, #REPLACEMENT_CARDS - 1)
    return REPLACEMENT_CARDS[randomIndex + 1]
end
return ____exports
end,
["pills"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local PillEffectCustom = ____enums_2Ecustom.PillEffectCustom
____exports.DURATION = 600
____exports.COLORS = {PillColor.PILL_BLUE_BLUE, PillColor.PILL_ORANGE_ORANGE, PillColor.PILL_WHITE_WHITE, PillColor.PILL_REDDOTS_RED}
____exports.EFFECTS = {PillEffect.PILLEFFECT_BALLS_OF_STEEL, PillEffect.PILLEFFECT_HEALTH_UP, PillEffect.PILLEFFECT_PRETTY_FLY, PillEffect.PILLEFFECT_SPEED_UP, PillEffect.PILLEFFECT_TEARS_UP, PillEffect.PILLEFFECT_48HOUR_ENERGY, PillEffect.PILLEFFECT_SEE_FOREVER, PillEffectCustom.PILLEFFECT_DAMAGE_UP, PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN, PillEffectCustom.PILLEFFECT_DEAL_AFFINITY, PillEffectCustom.PILLEFFECT_BONE_AFFINITY, PillEffectCustom.PILLEFFECT_RESTOCK, PillEffectCustom.PILLEFFECT_GOLDEN_DUMP, PillEffectCustom.PILLEFFECT_SUPER_SADNESS, PillEffectCustom.PILLEFFECT_INVINCIBILITY, PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS, PillEffectCustom.PILLEFFECT_GLIMPSE, PillEffectCustom.PILLEFFECT_AETHER, PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES, PillEffectCustom.PILLEFFECT_BLADDER_INFECTION, PillEffectCustom.PILLEFFECT_SCORCHED_EARTH}
____exports.WALL_COORDINATES = __TS__New(
    Map,
    {
        {
            RoomShape.ROOMSHAPE_1x1,
            __TS__New(Map, {{Direction.LEFT, {29, 7}}, {Direction.UP, {121, 13}}, {Direction.RIGHT, {15, 7}}, {Direction.DOWN, {1, 13}}})
        },
        {
            RoomShape.ROOMSHAPE_IH,
            __TS__New(Map, {{Direction.LEFT, {59, 3}}, {Direction.UP, {91, 13}}, {Direction.RIGHT, {45, 3}}, {Direction.DOWN, {31, 13}}})
        },
        {
            RoomShape.ROOMSHAPE_IV,
            __TS__New(Map, {{Direction.LEFT, {25, 7}}, {Direction.UP, {125, 5}}, {Direction.RIGHT, {19, 7}}, {Direction.DOWN, {5, 5}}})
        },
        {
            RoomShape.ROOMSHAPE_1x2,
            __TS__New(Map, {{Direction.LEFT, {44, 14}}, {Direction.UP, {226, 13}}, {Direction.RIGHT, {15, 14}}, {Direction.DOWN, {1, 13}}})
        },
        {
            RoomShape.ROOMSHAPE_IIV,
            __TS__New(Map, {{Direction.LEFT, {25, 14}}, {Direction.UP, {230, 5}}, {Direction.RIGHT, {19, 14}}, {Direction.DOWN, {5, 5}}})
        },
        {
            RoomShape.ROOMSHAPE_2x1,
            __TS__New(Map, {{Direction.LEFT, {55, 7}}, {Direction.UP, {225, 26}}, {Direction.RIGHT, {28, 7}}, {Direction.DOWN, {1, 26}}})
        },
        {
            RoomShape.ROOMSHAPE_IIH,
            __TS__New(Map, {{Direction.LEFT, {111, 3}}, {Direction.UP, {169, 26}}, {Direction.RIGHT, {84, 3}}, {Direction.DOWN, {57, 26}}})
        },
        {
            RoomShape.ROOMSHAPE_2x2,
            __TS__New(Map, {{Direction.LEFT, {55, 14}}, {Direction.UP, {421, 26}}, {Direction.RIGHT, {28, 14}}, {Direction.DOWN, {1, 26}}})
        },
        {
            RoomShape.ROOMSHAPE_LTL,
            __TS__New(Map, {{Direction.LEFT, {55, 14}}, {Direction.UP, {421, 26}}, {Direction.RIGHT, {41, 7, 224}}, {Direction.DOWN, {197, 13, 14}}})
        },
        {
            RoomShape.ROOMSHAPE_LTR,
            __TS__New(Map, {{Direction.LEFT, {42, 7, 251}}, {Direction.UP, {421, 26}}, {Direction.RIGHT, {28, 14}}, {Direction.DOWN, {1, 13, 210}}})
        },
        {
            RoomShape.ROOMSHAPE_LBL,
            __TS__New(Map, {{Direction.LEFT, {55, 14}}, {Direction.UP, {225, 13, 434}}, {Direction.RIGHT, {28, 7, 237}}, {Direction.DOWN, {1, 26}}})
        },
        {
            RoomShape.ROOMSHAPE_LBR,
            __TS__New(Map, {{Direction.LEFT, {55, 7, 238}}, {Direction.UP, {421, 13, 238}}, {Direction.RIGHT, {28, 14}}, {Direction.DOWN, {1, 26}}})
        }
    }
)
function ____exports.animateHappy(self)
    g.p:AnimateHappy()
    local color = Color(0.3, 0.3, 0.3, 1, 1, 1, 1)
    g.p:SetColor(color, 15, 1, true, false)
    g.sfx:Stop(SoundEffect.SOUND_THUMBSUP)
    g.sfx:Play(SoundEffect.SOUND_POWERUP_SPEWER, 1, 0, false, 1)
end
function ____exports.getDuration(self)
    local duration = ____exports.DURATION
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        duration = duration * 2
    end
    return duration
end
return ____exports
end,
["callbacks.getPillColor"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local pills = require("pills")
function ____exports.main(self, seed)
    math.randomseed(seed)
    local randomIndex = math.random(0, #pills.COLORS - 1)
    return pills.COLORS[randomIndex + 1]
end
return ____exports
end,
["callbacks.getPillEffect"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local pills = require("pills")
function ____exports.main(self, pillEffect, pillColor)
    if not __TS__ArrayIncludes(pills.COLORS, pillColor) then
        return pillEffect
    end
    local newPillEffect = g.run.pills.effects:get(pillColor)
    if newPillEffect == nil then
        error(
            __TS__New(
                Error,
                "Failed to get the pill effect for a pill color of: " .. tostring(pillColor)
            ),
            0
        )
    end
    return newPillEffect
end
return ____exports
end,
["callbacks.postBombUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local drFetus, sacredHeart
function drFetus(self, bomb)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_DR_FETUS) then
        return
    end
    if not bomb.IsFetus then
        return
    end
    g.run.familiarMultiShot = 2
    g.run.familiarMultiShotVelocity = bomb.Velocity
end
function sacredHeart(self, bomb)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_SACRED_HEART) then
        return
    end
    local homing = (bomb.Flags & (1 << 2)) >> 2
    if homing == 0 then
        return
    end
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BOBBY_BOMB) then
        return
    end
    bomb.Flags = bomb.Flags & ~TearFlags.TEAR_HOMING
end
function ____exports.main(self, bomb)
    if (bomb.SpawnerType ~= EntityType.ENTITY_PLAYER) or (bomb.FrameCount ~= 1) then
        return
    end
    drFetus(nil, bomb)
    sacredHeart(nil, bomb)
end
return ____exports
end,
["callbacks.postEffectUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CreepSubTypeCustom = ____enums_2Ecustom.CreepSubTypeCustom
local dicePipFunctions, spawnPickupsInCircle
function spawnPickupsInCircle(self, numToSpawn, pickupVariant, pickupSubType)
    local velocityMultiplier = 4
    local roomSeed = g.r:GetSpawnSeed()
    local centerPos = g.r:GetCenterPos()
    local seed = roomSeed
    do
        local i = 0
        while i < numToSpawn do
            local velocity = Vector(velocityMultiplier, 0)
            local degrees = (360 / numToSpawn) * i
            local rotatedVelocity = velocity:Rotated(degrees)
            seed = misc:incrementRNG(seed)
            g.g:Spawn(EntityType.ENTITY_PICKUP, pickupVariant, centerPos, rotatedVelocity, nil, pickupSubType, seed)
            i = i + 1
        end
    end
end
function ____exports.blueFlame(self, effect)
    if effect.FrameCount == 0 then
        effect.Size = effect.Size * 2
        effect.CollisionDamage = effect.CollisionDamage * 2
    end
    effect.SpriteScale = Vector(1.5, 1.5)
end
function ____exports.diceRoomCustom(self, effect)
    if effect.State == 1 then
        return
    end
    local activationDistance = 75
    if g.p.Position:Distance(effect.Position) > activationDistance then
        return
    end
    effect.State = 1
    g.p:AnimateHappy()
    Isaac.DebugString(
        ("Activated a " .. tostring(effect.SubType)) .. "-pip custom dice room."
    )
    local streakText = dicePipFunctions[effect.SubType](dicePipFunctions)
    RacingPlusGlobals.run.streakFrame = Isaac.GetFrameCount()
    RacingPlusGlobals.run.streakText = streakText
end
dicePipFunctions = {
    function()
        local effectDescription = "Spawn a random item from one of the six item pools"
        local roomSeed = g.r:GetSpawnSeed()
        math.randomseed(roomSeed)
        local randomMapIndex = math.random(1, 6)
        local itemPoolTypeMap = __TS__New(Map, {{1, ItemPoolType.POOL_TREASURE}, {2, ItemPoolType.POOL_SHOP}, {3, ItemPoolType.POOL_BOSS}, {4, ItemPoolType.POOL_DEVIL}, {5, ItemPoolType.POOL_ANGEL}, {6, ItemPoolType.POOL_LIBRARY}})
        local itemPoolType = itemPoolTypeMap:get(randomMapIndex)
        if itemPoolType == nil then
            error(
                __TS__New(
                    Error,
                    ("Unknown map index of " .. tostring(randomMapIndex)) .. "."
                ),
                0
            )
        end
        local subType = g.itemPool:GetCollectible(
            itemPoolType,
            true,
            g.r:GetSpawnSeed()
        )
        g.g:Spawn(
            EntityType.ENTITY_PICKUP,
            PickupVariant.PICKUP_COLLECTIBLE,
            g.r:GetCenterPos(),
            g.zeroVector,
            nil,
            subType,
            roomSeed
        )
        return effectDescription
    end,
    function()
        g.run.level.doubleItems = true
        return "Double items for the rest of the floor"
    end,
    function()
        spawnPickupsInCircle(nil, 3, PickupVariant.PICKUP_COIN, CoinSubType.COIN_DIME)
        return "Spawn 3 dimes"
    end,
    function()
        spawnPickupsInCircle(nil, 3, PickupVariant.PICKUP_HEART, HeartSubType.HEART_SOUL)
        return "Spawn 4 soul hearts"
    end,
    function()
        spawnPickupsInCircle(nil, 10, PickupVariant.PICKUP_TRINKET, 0)
        return "Spawn 10 trinkets"
    end,
    function()
        spawnPickupsInCircle(nil, 10, PickupVariant.PICKUP_TAROTCARD, 0)
        return "Spawn 6 cards"
    end
}
function ____exports.creepScaling(self, effect)
    if effect.SubType == CreepSubTypeCustom.FLOOR_EFFECT_CREEP then
        return
    end
    effect.CollisionDamage = g.p.Damage
    if effect.Variant == EffectVariant.PLAYER_CREEP_GREEN then
        effect.CollisionDamage = effect.CollisionDamage / 10
    end
end
return ____exports
end,
["callbacks.postFireTear"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local FAMILIAR_TEAR_DAMAGE = ____constants.FAMILIAR_TEAR_DAMAGE
local FAMILIAR_TEAR_SCALE = ____constants.FAMILIAR_TEAR_SCALE
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local pills = require("pills")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local momsContacts, abel, tinyPlanet, isaacsHeart, theWiz, fireMind, strabismus, u235, pillAether, pillWallsHaveEyes, removeFear, familiars
function momsContacts(self, tear)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_MOMS_CONTACTS) then
        return
    end
    tear.TearFlags = tear.TearFlags | TearFlags.TEAR_FREEZE
end
function abel(self, tear)
    if (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_ABEL)) or g.run.abelDoubleTear then
        return
    end
    local abels = Isaac.FindByType(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ABEL, -1, false, false)
    for ____, abelEntity in ipairs(abels) do
        g.run.abelDoubleTear = true
        local velocity = tear.Velocity:__mul(-1)
        g.p:FireTear(abelEntity.Position, velocity, false, true, false)
        g.run.abelDoubleTear = false
    end
end
function tinyPlanet(self, tear)
    local direction = g.p:GetFireDirection()
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) then
        return
    end
    tear.TearFlags = tear.TearFlags | TearFlags.TEAR_SPECTRAL
    tear.FallingSpeed = 0
    tear.SubType = direction + 1
    local distance = 90
    local degrees = 0
    if direction == Direction.RIGHT then
        degrees = degrees + 90
    elseif direction == Direction.DOWN then
        degrees = degrees + 180
    elseif direction == Direction.LEFT then
        degrees = degrees + 270
    end
    tear.Position = g.p.Position:__add(
        Vector(0, distance * -1)
    ):Rotated(degrees)
end
function isaacsHeart(self, tear)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
        return
    end
    g.run.spawningIsaacsHeartLaser = true
    g.p:FireBrimstone(tear.Velocity)
    g.run.spawningIsaacsHeartLaser = false
    tear:Remove()
end
function theWiz(self, tear)
    if (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_THE_WIZ)) or g.run.wizDoubleTear then
        return
    end
    g.run.wizDoubleTear = true
    g.p:FireTear(
        g.p.Position,
        tear.Velocity:__mul(-1),
        false,
        false,
        false
    )
    g.run.wizDoubleTear = false
end
function fireMind(self, tear)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED) then
        return
    end
    tear.SubType = 1
end
function strabismus(self, tear)
    if (not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_STRABISMUS)) or g.run.strabismusDoubleTear then
        return
    end
    local seed = tear:GetDropRNG():GetSeed()
    math.randomseed(seed)
    local rotation = math.random(1, 359)
    local velocity = tear.Velocity:Rotated(rotation)
    g.run.strabismusDoubleTear = true
    g.p:FireTear(g.p.Position, velocity, false, false, false)
    g.run.strabismusDoubleTear = false
end
function u235(self, tear)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_U235) then
        return
    end
    if (g.run.tearCounter % 8) == 0 then
        local bomb = g.g:Spawn(EntityType.ENTITY_BOMBDROP, 0, tear.Position, tear.Velocity, tear.SpawnerEntity, 0, tear.InitSeed):ToBomb()
        bomb.ExplosionDamage = (g.p.Damage * 5) + 30
        tear:Remove()
    end
end
function pillAether(self, tear)
    if g.run.pills.aether == 0 then
        return
    end
    local ____obj, ____index = g.run.pills, "aetherAngle"
    ____obj[____index] = ____obj[____index] + 45
    if g.run.pills.aetherAngle < 360 then
        local vel = tear.Velocity:Rotated(g.run.pills.aetherAngle)
        g.p:FireTear(g.p.Position, vel, false, false, false)
    else
        g.run.pills.aetherAngle = 0
    end
end
function pillWallsHaveEyes(self, tear)
    if (g.run.pills.wallsHaveEyes == 0) or g.run.pills.wallsHaveEyesShooting then
        return
    end
    g.run.pills.wallsHaveEyesShooting = true
    local direction = g.p:GetFireDirection()
    local roomShape = g.r:GetRoomShape()
    local amountToAdd = 1
    if (direction == Direction.LEFT) or (direction == Direction.RIGHT) then
        amountToAdd = 15
        if roomShape >= RoomShape.ROOMSHAPE_2x1 then
            amountToAdd = 28
        end
    end
    local roomShapeCoordinates = pills.WALL_COORDINATES:get(roomShape)
    if roomShapeCoordinates == nil then
        error(
            __TS__New(
                Error,
                "Failed to get the wall coordinates for room shape: " .. tostring(roomShape)
            ),
            0
        )
    end
    local coordinates = roomShapeCoordinates:get(direction)
    if coordinates == nil then
        error(
            __TS__New(
                Error,
                "Failed to get the wall coordinates direction: " .. tostring(direction)
            ),
            0
        )
    end
    local startingGridCoordinate, numTimesToIterate, startingGridCoordinateForSecondWall = table.unpack(coordinates)
    local walls = {}
    do
        local i = 0
        while i < numTimesToIterate do
            local coordinate = startingGridCoordinate + (i * amountToAdd)
            __TS__ArrayPush(walls, coordinate)
            i = i + 1
        end
    end
    if startingGridCoordinateForSecondWall ~= nil then
        do
            local i = 0
            while i < numTimesToIterate do
                local coordinate = startingGridCoordinateForSecondWall + (i * amountToAdd)
                __TS__ArrayPush(walls, coordinate)
                i = i + 1
            end
        end
    end
    for ____, wall in ipairs(walls) do
        local gridEntity = g.r:GetGridEntity(wall)
        if gridEntity ~= nil then
            local saveState = gridEntity:GetSaveState()
            if saveState.Type == GridEntityType.GRID_WALL then
                local adjustedPosition = gridEntity.Position
                local distanceToAdjust = 15
                if direction == Direction.LEFT then
                    adjustedPosition = adjustedPosition:__add(
                        Vector(distanceToAdjust * -1, 0)
                    )
                elseif direction == Direction.UP then
                    adjustedPosition = adjustedPosition:__add(
                        Vector(0, distanceToAdjust * -1)
                    )
                elseif direction == Direction.RIGHT then
                    adjustedPosition = adjustedPosition:__add(
                        Vector(distanceToAdjust, 0)
                    )
                elseif direction == Direction.DOWN then
                    adjustedPosition = adjustedPosition:__add(
                        Vector(0, distanceToAdjust)
                    )
                end
                g.p:FireTear(adjustedPosition, tear.Velocity, false, true, false)
            end
        end
    end
    g.run.pills.wallsHaveEyesShooting = false
end
function removeFear(self, tear)
    tear.TearFlags = tear.TearFlags & ~TearFlags.TEAR_FEAR
end
function familiars(self, tear)
    local damage = 3.5 + (g.p.Damage * FAMILIAR_TEAR_DAMAGE)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    local velocity = tear.Velocity
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) then
        velocity = misc:getVelocityFromAimDirection()
    end
    local familiarEntities = Isaac.FindByType(EntityType.ENTITY_FAMILIAR, -1, -1, false, false)
    for ____, familiar in ipairs(familiarEntities) do
        if (((((((((familiar.Variant == FamiliarVariant.BROTHER_BOBBY) or (familiar.Variant == FamiliarVariant.DEMON_BABY)) or (familiar.Variant == FamiliarVariant.LITTLE_GISH)) or (familiar.Variant == FamiliarVariant.LITTLE_STEVEN)) or (familiar.Variant == FamiliarVariant.SISTER_MAGGY)) or (familiar.Variant == FamiliarVariant.GHOST_BABY)) or (familiar.Variant == FamiliarVariant.RAINBOW_BABY)) or (familiar.Variant == FamiliarVariant.ISAACS_HEAD)) or (familiar.Variant == FamiliarVariant.MONGO_BABY)) or (familiar.Variant == FamiliarVariant.SERAPHIM) then
            local familiarTear = Isaac.Spawn(EntityType.ENTITY_TEAR, 0, 0, familiar.Position, velocity, nil):ToTear()
            familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE
            familiarTear.CollisionDamage = damage
            if familiar.Variant == FamiliarVariant.LITTLE_GISH then
                local color = Color(0, 0, 0, 1, 1, 1, 1)
                familiarTear:SetColor(color, 10000, 1000, false, false)
                familiarTear.TearFlags = familiarTear.TearFlags | TearFlags.TEAR_SLOW
            elseif familiar.Variant == FamiliarVariant.LITTLE_STEVEN then
                local color = Color(1, 0, 1, 1, 1, 1, 1)
                familiarTear:SetColor(color, 10000, 1000, false, false)
                familiarTear.TearFlags = familiarTear.TearFlags | TearFlags.TEAR_HOMING
            elseif familiar.Variant == FamiliarVariant.GHOST_BABY then
                local color = Color(1, 1, 1, 0.5, 1, 1, 1)
                familiarTear:SetColor(color, 10000, 1000, false, false)
                familiarTear.TearFlags = familiarTear.TearFlags | TearFlags.TEAR_SPECTRAL
            elseif familiar.Variant == FamiliarVariant.RAINBOW_BABY then
                local color = Color(2, 0, 2, 1, 1, 1, 1)
                familiarTear:SetColor(color, 10000, 1000, false, false)
                math.randomseed(
                    g.g:GetFrameCount()
                )
                local tearFlag = math.random(1, 60)
                familiarTear.TearFlags = familiarTear.TearFlags | (1 << tearFlag)
            elseif familiar.Variant == FamiliarVariant.MONGO_BABY then
                __TS__ArrayPush(
                    g.run.room.mongoBabyTears,
                    {
                        frame = g.g:GetFrameCount() + 3,
                        familiar = EntityRef(familiar),
                        velocity = velocity,
                        damage = damage,
                        scale = tear.Scale * FAMILIAR_TEAR_SCALE
                    }
                )
            elseif familiar.Variant == FamiliarVariant.SERAPHIM then
                familiarTear.CollisionDamage = damage * 1.8953
                local color = Color(1, 1, 1, 1, 1, 1, 1)
                familiarTear:SetColor(color, 10000, 1000, false, false)
                familiarTear.TearFlags = familiarTear.TearFlags | TearFlags.TEAR_HOMING
            end
        elseif familiar.Variant == FamiliarVariant.ROBO_BABY then
            local laser = g.p:FireTechLaser(familiar.Position, 0, velocity, false, false)
            laser.CollisionDamage = damage
        elseif familiar.Variant == FamiliarVariant.HARLEQUIN_BABY then
            do
                local i = 0
                while i < 2 do
                    if i == 1 then
                        velocity = velocity:Rotated(-10)
                    elseif i == 2 then
                        velocity = velocity:Rotated(10)
                    end
                    local familiarTear = Isaac.Spawn(EntityType.ENTITY_TEAR, 0, 0, familiar.Position, velocity, nil):ToTear()
                    familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE
                    familiarTear.CollisionDamage = damage
                    i = i + 1
                end
            end
        elseif familiar.Variant == FamiliarVariant.LIL_LOKI then
            do
                local i = 0
                while i < 4 do
                    local familiarTear = Isaac.Spawn(EntityType.ENTITY_TEAR, 0, 0, familiar.Position, velocity, nil):ToTear()
                    velocity = velocity:Rotated(90)
                    familiarTear.Scale = tear.Scale * FAMILIAR_TEAR_SCALE
                    familiarTear.CollisionDamage = damage
                    i = i + 1
                end
            end
        end
    end
end
function ____exports.main(self, tear)
    if ((not g.run.abelDoubleTear) and (not g.run.wizDoubleTear)) and (not g.run.strabismusDoubleTear) then
        local ____obj, ____index = g.run, "tearCounter"
        ____obj[____index] = ____obj[____index] + 1
    end
    momsContacts(nil, tear)
    abel(nil, tear)
    tinyPlanet(nil, tear)
    isaacsHeart(nil, tear)
    theWiz(nil, tear)
    fireMind(nil, tear)
    strabismus(nil, tear)
    u235(nil, tear)
    pillAether(nil, tear)
    pillWallsHaveEyes(nil, tear)
    removeFear(nil, tear)
    familiars(nil, tear)
end
return ____exports
end,
["items.technology"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local TECHNOLOGY_EXCEPTION_ITEMS = ____constants.TECHNOLOGY_EXCEPTION_ITEMS
local ____globals = require("globals")
local g = ____globals.default
local hasPowerfulItem
function hasPowerfulItem(self)
    for ____, item in ipairs(TECHNOLOGY_EXCEPTION_ITEMS) do
        if g.p:HasCollectible(item) then
            return true
        end
    end
    return false
end
function ____exports.postUpdate(self)
    if g.run.technologyAdded2020 and hasPowerfulItem(nil) then
        g.run.technologyAdded2020 = false
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_20_20)
    end
end
function ____exports.postItemPickup(self)
    if not hasPowerfulItem(nil) then
        g.run.technologyAdded2020 = true
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_20_20, 0, false)
        Isaac.DebugString("Removing collectible 245 (20/20)")
    end
end
return ____exports
end,
["items.technology25"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
function ____exports.postNewRoom(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5) then
        return
    end
    local radius = 66
    local laser = g.p:FireTechXLaser(g.p.Position, g.zeroVector, radius):ToLaser()
    if laser.Variant ~= 2 then
        laser.Variant = 2
        laser.SpriteScale = Vector(0.5, 1)
    end
    laser.TearFlags = laser.TearFlags | TearFlags.TEAR_CONTINUUM
    laser.CollisionDamage = laser.CollisionDamage * 0.33
    local data = laser:GetData()
    data.ring = true
end
function ____exports.postItemPickup(self)
    local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY_2)
    g.p:AddCostume(item, false)
    ____exports.postNewRoom(nil)
end
return ____exports
end,
["postItemPickup"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local ISAACS_HEART_BROKEN_ITEMS = ____constants.ISAACS_HEART_BROKEN_ITEMS
local ____globals = require("globals")
local g = ____globals.default
local technology = require("items.technology")
local technology25 = require("items.technology25")
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local holyPoop, fannyPackImproved, fireMindImproved, holyMantleNerfed, adrenalineCustom
function ____exports.blueMap(self)
    local bossIndex = g.l:QueryRoomTypeIndex(
        RoomType.ROOM_BOSS,
        false,
        RNG()
    )
    local bossRoom = g.l:GetRoomByIdx(bossIndex)
    if bossRoom.DisplayFlags == 0 then
        bossRoom.DisplayFlags = 4
    end
    g.l:UpdateVisibility()
end
function holyPoop(self)
    g.p:AddCollectible(CollectibleType.COLLECTIBLE_POOP, 0, false)
    g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, 1, false)
end
function fannyPackImproved(self)
    local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_FANNY_PACK)
    g.p:AddCostume(item, false)
end
function fireMindImproved(self)
    local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_FIRE_MIND)
    g.p:AddCostume(item, false)
end
function holyMantleNerfed(self)
    g.run.holyMantle = true
    local effects = g.p:GetEffects()
    if not effects:HasCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE) then
        effects:AddCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE, false)
    end
    local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_HOLY_MANTLE)
    g.p:AddCostume(item, false)
end
function adrenalineCustom(self)
    g.p:AddCollectible(CollectibleType.COLLECTIBLE_ADDERLINE, 0, false)
    g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_ADDERLINE)
    Isaac.DebugString("Removing collectible 493 (Adrenaline)")
    local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_ADDERLINE)
    g.p:AddCostume(item, false)
end
____exports.functionMap = __TS__New(Map)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_MAGIC_MUSHROOM,
    function()
        misc:setHealthFromLastFrame()
        misc:killIfNoHealth()
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_POOP,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_POOP)
        holyPoop(nil)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_MOMS_BRA,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_MOMS_BRA)
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED, 1, false)
    end
)
____exports.functionMap:set(CollectibleType.COLLECTIBLE_TECHNOLOGY, technology.postItemPickup)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_LITTLE_CHUBBY,
    function()
        do
            local i = 0
            while i < 2 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_LITTLE_CHUBBY, 0, false)
                Isaac.DebugString("Removing collectible 88 (Little Chubby)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_SUPER_BANDAGE,
    function()
        misc:setHealthFromLastFrame()
        g.p:AddMaxHearts(2, false)
        g.p:AddSoulHearts(2)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_WAFER,
    function()
        g.run.wafer = true
        g.run.waferCounters = 2
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_MOMS_KNIFE,
    function()
        g.itemPool:RemoveCollectible(CollectibleType.COLLECTIBLE_20_20)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_BRIMSTONE,
    function()
        g.itemPool:RemoveCollectible(CollectibleType.COLLECTIBLE_20_20)
        g.itemPool:RemoveCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_TECHNOLOGY_2,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY_2)
        Isaac.DebugString("Removing collectible 152 (Technology 2)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5, 0, false)
        technology25:postItemPickup()
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_SACRED_HEART,
    function()
        misc:setHealthFromLastFrame()
        misc:killIfNoHealth()
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_FANNY_PACK,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_FANNY_PACK)
        Isaac.DebugString("Removing collectible 204 (Fanny Pack)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED, 0, false)
        fannyPackImproved(nil)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_CEREMONIAL_ROBES,
    function()
        misc:setHealthFromLastFrame()
        g.p:AddBlackHearts(2)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_ABADDON,
    function()
        misc:setHealthFromLastFrame()
        g.p:AddBlackHearts(4)
    end
)
____exports.functionMap:set(CollectibleType.COLLECTIBLE_BLUE_MAP, ____exports.blueMap)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_FIRE_MIND,
    function()
        if not misc:isOnTearBuild() then
            return
        end
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_FIRE_MIND)
        Isaac.DebugString("Removing collectible 204 (Fire Mind)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED, 0, false)
        fireMindImproved(nil)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_LEECH,
    function()
        do
            local i = 0
            while i < 4 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_LEECH, 0, false)
                Isaac.DebugString("Removing collectible 270 (Leech)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_ISAACS_HEART,
    function()
        for ____, item in ipairs(ISAACS_HEART_BROKEN_ITEMS) do
            g.p:RemoveCollectible(item)
            g.itemPool:RemoveCollectible(item)
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_LIL_HAUNT,
    function()
        do
            local i = 0
            while i < 2 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_LIL_HAUNT, 0, false)
                Isaac.DebugString("Removing collectible 277 (Lil Haunt)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_SISSY_LONGLEGS,
    function()
        do
            local i = 0
            while i < 9 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_SISSY_LONGLEGS, 0, false)
                Isaac.DebugString("Removing collectible 280 (Sissy Longlegs)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_CAPRICORN,
    function()
        misc:setHealthFromLastFrame()
        misc:killIfNoHealth()
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_HOLY_MANTLE,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_HOLY_MANTLE)
        Isaac.DebugString("Removing collectible 313 (Holy Mantle)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED, 0, false)
        holyMantleNerfed(nil)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_MR_DOLLY,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_MR_DOLLY)
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
        Isaac.DebugString("Removing collectible 1 (Sad Onion)")
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_LIL_GURDY,
    function()
        do
            local i = 0
            while i < 4 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_LIL_GURDY, 0, false)
                Isaac.DebugString("Removing collectible 384 (Lil Gurdy)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_CROWN_OF_LIGHT,
    function()
        misc:setHealthFromLastFrame()
        misc:killIfNoHealth()
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_MEGA_SATANS_BREATH,
    function()
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE, 0, false)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_BIG_CHUBBY,
    function()
        do
            local i = 0
            while i < 2 do
                g.p:AddCollectible(CollectibleType.COLLECTIBLE_BIG_CHUBBY, 0, false)
                Isaac.DebugString("Removing collectible 473 (Big Chubby)")
                i = i + 1
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_ADDERLINE,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_ADDERLINE)
        Isaac.DebugString("Removing collectible 493 (Adrenaline)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED, 0, false)
        adrenalineCustom(nil)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_POKE_GO,
    function()
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_POKE_GO)
        Isaac.DebugString("Removing collectible 505 (Poke Go)")
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED, 0, false)
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_DIVORCE_PAPERS,
    function()
        g.p:AddBoneHearts(-1)
        if g.p:HasTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER) then
            g.p:TryRemoveTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER)
        else
            local papers = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_TRINKET, TrinketType.TRINKET_MYSTERIOUS_PAPER, false, false)
            for ____, paper in ipairs(papers) do
                paper:Remove()
            end
        end
    end
)
____exports.functionMap:set(
    CollectibleType.COLLECTIBLE_BRITTLE_BONES,
    function()
        g.p:AddBoneHearts(-4)
    end
)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP, holyPoop)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5, technology25.postItemPickup)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_FANNY_PACK_IMPROVED, fannyPackImproved)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED, fireMindImproved)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED, holyMantleNerfed)
____exports.functionMap:set(
    CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED,
    function()
        local item = g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_MR_DOLLY)
        g.p:AddCostume(item, false)
        g.p:RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_MR_DOLLY_NERFED)
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
        Isaac.DebugString("Removing collectible 1 (Sad Onion)")
    end
)
____exports.functionMap:set(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED, adrenalineCustom)
return ____exports
end,
["callbacks.postNewRoom"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local POKE_GO_EXCEPTION_ENTITIES = ____constants.POKE_GO_EXCEPTION_ENTITIES
local ____globals = require("globals")
local g = ____globals.default
local technology25 = require("items.technology25")
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local EffectVariantCustom = ____enums_2Ecustom.EffectVariantCustom
local SlotVariantCustom = ____enums_2Ecustom.SlotVariantCustom
local ____GlobalsRunRoom = require("types.GlobalsRunRoom")
local GlobalsRunRoom = ____GlobalsRunRoom.default
local checkDressingMachine, checkShopMachine, replaceArcade, replaceCurseRoom, replaceChallengeRoom, replaceRedChestDD, replaceChestRoom, replaceDiceRoom, abel, blueMap, holyMantle, pokeGoImproved
function ____exports.newRoom(self)
    g.run.currentRoomClearState = g.r:IsClear()
    g.run.room = __TS__New(GlobalsRunRoom)
    checkDressingMachine(nil)
    checkShopMachine(nil)
    replaceArcade(nil)
    replaceCurseRoom(nil)
    replaceChallengeRoom(nil)
    replaceRedChestDD(nil)
    replaceChestRoom(nil)
    replaceDiceRoom(nil)
    abel(nil)
    blueMap(nil)
    holyMantle(nil)
    pokeGoImproved(nil)
    technology25:postNewRoom()
    ____exports.familiarFrenzy(nil)
end
function checkDressingMachine(self)
    local roomIndex = misc:getRoomIndex()
    local startingRoomIndex = g.l:GetStartingRoomIndex()
    if roomIndex ~= startingRoomIndex then
        return
    end
    misc:removeSpecificEntities(EntityType.ENTITY_SLOT, 12)
end
function checkShopMachine(self)
    local roomSeed = g.r:GetSpawnSeed()
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if (roomType ~= RoomType.ROOM_SHOP) or (not isFirstVisit) then
        return
    end
    local greeds = Isaac.FindByType(EntityType.ENTITY_GREED, -1, -1, false, false)
    if #greeds > 0 then
        return
    end
    misc:removeSpecificEntities(EntityType.ENTITY_SLOT, 10)
    math.randomseed(roomSeed)
    local machine = math.random(1, 3)
    local ____switch10 = machine
    if ____switch10 == 1 then
        goto ____switch10_case_0
    elseif ____switch10 == 2 then
        goto ____switch10_case_1
    elseif ____switch10 == 3 then
        goto ____switch10_case_2
    end
    goto ____switch10_case_default
    ::____switch10_case_0::
    do
        do
            g.g:Spawn(
                EntityType.ENTITY_SLOT,
                10,
                Vector(200, 160),
                g.zeroVector,
                nil,
                0,
                g.r:GetSpawnSeed()
            )
            goto ____switch10_end
        end
    end
    ::____switch10_case_1::
    do
        do
            g.g:Spawn(
                EntityType.ENTITY_SLOT,
                SlotVariantCustom.TRANSMUTATION_MACHINE,
                Vector(200, 160),
                g.zeroVector,
                nil,
                0,
                g.r:GetSpawnSeed()
            )
            goto ____switch10_end
        end
    end
    ::____switch10_case_2::
    do
        do
            goto ____switch10_end
        end
    end
    ::____switch10_case_default::
    do
        do
            error(
                __TS__New(
                    Error,
                    "Unknown machine case of: " .. tostring(machine)
                ),
                0
            )
        end
    end
    ::____switch10_end::
end
function replaceArcade(self)
    local stage = g.l:GetStage()
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if roomType ~= RoomType.ROOM_ARCADE then
        return
    end
    misc:removeAllGridEntities()
    if not isFirstVisit then
        return
    end
    misc:removeAllEntities()
    Isaac.Spawn(
        EntityType.ENTITY_SLOT,
        4,
        0,
        misc:gridToPos(2, 1),
        g.zeroVector,
        nil
    )
    Isaac.Spawn(
        EntityType.ENTITY_SLOT,
        2,
        0,
        misc:gridToPos(10, 1),
        g.zeroVector,
        nil
    )
    Isaac.Spawn(
        EntityType.ENTITY_SLOT,
        SlotVariantCustom.BOMB_DONATION_MACHINE,
        0,
        misc:gridToPos(2, 5),
        g.zeroVector,
        nil
    )
    Isaac.Spawn(
        EntityType.ENTITY_SLOT,
        SlotVariantCustom.KEY_DONATION_MACHINE,
        0,
        misc:gridToPos(10, 5),
        g.zeroVector,
        nil
    )
    local roulettePosition = g.r:GetCenterPos()
    if stage == 8 then
        roulettePosition = misc:gridToPos(4, 3)
    end
    Isaac.Spawn(EntityType.ENTITY_SLOT, SlotVariantCustom.ROULETTE_TABLE, 0, roulettePosition, g.zeroVector, nil)
    if stage == 8 then
        Isaac.Spawn(
            EntityType.ENTITY_SLOT,
            SlotVariantCustom.HOLY_MACHINE,
            0,
            misc:gridToPos(8, 3),
            g.zeroVector,
            nil
        )
    end
end
function replaceCurseRoom(self)
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if roomType ~= RoomType.ROOM_CURSE then
        return
    end
    misc:removeAllGridEntities()
    if not isFirstVisit then
        return
    end
    misc:removeAllEntities()
    ____exports.spawnCurseRoomPedestalItem(nil)
end
function ____exports.spawnCurseRoomPedestalItem(self)
    local centerPos = g.r:GetCenterPos()
    local subType = g.itemPool:GetCollectible(
        ItemPoolType.POOL_CURSE,
        true,
        g.r:GetSpawnSeed()
    )
    local collectible = Isaac.Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, subType, centerPos, g.zeroVector, nil):ToPickup()
    collectible.AutoUpdatePrice = false
    collectible.Price = -1
end
function replaceChallengeRoom(self)
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if roomType ~= RoomType.ROOM_CHALLENGE then
        return
    end
    misc:removeAllGridEntities()
    if not isFirstVisit then
        return
    end
    misc:removeAllEntities()
    local subType = g.itemPool:GetCollectible(
        ItemPoolType.POOL_TREASURE,
        true,
        g.r:GetSpawnSeed()
    )
    Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COLLECTIBLE,
        subType,
        g.r:GetCenterPos(),
        g.zeroVector,
        nil
    ):ToPickup()
end
function replaceRedChestDD(self)
    local roomDesc = g.l:GetCurrentRoomDesc()
    local roomVariant = roomDesc.Data.Variant
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if ((roomType ~= RoomType.ROOM_DEVIL) or (roomVariant ~= 18)) or (not isFirstVisit) then
        return
    end
    misc:removeSpecificEntities(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_REDCHEST)
    Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_SHOPITEM,
        0,
        misc:gridToPos(6, 4),
        g.zeroVector,
        nil
    )
end
function replaceChestRoom(self)
    local velocityMultiplier = 8
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    local centerPos = g.r:GetCenterPos()
    local roomSeed = g.r:GetSpawnSeed()
    local numKeys = g.p:GetNumKeys()
    if roomType ~= RoomType.ROOM_CHEST then
        return
    end
    misc:removeAllGridEntities()
    if not isFirstVisit then
        return
    end
    misc:removeAllEntities()
    local numToSpawn = numKeys
    local numToSpawnMin = 8
    if numToSpawn < numToSpawnMin then
        numToSpawn = numToSpawnMin
    end
    local numToSpawnMax = 30
    if numToSpawn > numToSpawnMax then
        numToSpawn = numToSpawnMax
    end
    local seed = roomSeed
    do
        local i = 0
        while i < numToSpawn do
            local velocity = Vector(velocityMultiplier, 0)
            local degrees = (360 / numToSpawn) * i
            local rotatedVelocity = velocity:Rotated(degrees)
            seed = misc:incrementRNG(seed)
            local variant = PickupVariant.PICKUP_LOCKEDCHEST
            if i >= numKeys then
                variant = PickupVariant.PICKUP_CHEST
            end
            g.g:Spawn(EntityType.ENTITY_PICKUP, variant, centerPos, rotatedVelocity, nil, 0, seed)
            i = i + 1
        end
    end
end
function replaceDiceRoom(self)
    local roomType = g.r:GetType()
    local isFirstVisit = g.r:IsFirstVisit()
    if roomType ~= RoomType.ROOM_DICE then
        return
    end
    misc:removeAllGridEntities()
    if g.run.level.usedDiceRoom then
        return
    end
    g.run.level.usedDiceRoom = true
    if isFirstVisit then
        misc:removeAllEntities()
    end
    math.randomseed(
        g.r:GetSpawnSeed()
    )
    local dicePip = math.random(1, 6)
    local diceEffect = Isaac.Spawn(
        EntityType.ENTITY_EFFECT,
        EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM,
        dicePip,
        g.r:GetCenterPos(),
        g.zeroVector,
        nil
    )
    diceEffect:GetSprite():Play(
        tostring(dicePip),
        true
    )
    diceEffect.DepthOffset = -150
end
function abel(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_ABEL) then
        return
    end
    local abels = Isaac.FindByType(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ABEL, -1, false, false)
    for ____, abelEntity in ipairs(abels) do
        abelEntity:ToFamiliar().FireCooldown = 1000000
    end
end
function blueMap(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_BLUE_MAP) then
        return
    end
    local bossIndex = g.l:QueryRoomTypeIndex(
        RoomType.ROOM_BOSS,
        false,
        RNG()
    )
    local bossRoom = g.l:GetRoomByIdx(bossIndex)
    if bossRoom.DisplayFlags == 0 then
        bossRoom.DisplayFlags = 4
    end
end
function holyMantle(self)
    if (not g.run.holyMantle) or (not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED)) then
        return
    end
    local effects = g.p:GetEffects()
    effects:AddCollectibleEffect(CollectibleType.COLLECTIBLE_HOLY_MANTLE, true)
end
function pokeGoImproved(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_POKE_GO_IMPROVED) then
        return
    end
    local targetNPC = nil
    for ____, entity in ipairs(
        Isaac.GetRoomEntities()
    ) do
        local npc = entity:ToNPC()
        if ((npc ~= nil) and (not npc:IsBoss())) and (not __TS__ArrayIncludes(POKE_GO_EXCEPTION_ENTITIES, npc.Type)) then
            targetNPC = npc
            break
        end
    end
    if targetNPC == nil then
        return
    end
    targetNPC:AddEntityFlags(EntityFlag.FLAG_CHARM)
    targetNPC:AddEntityFlags(EntityFlag.FLAG_FRIENDLY)
    targetNPC:AddEntityFlags(EntityFlag.FLAG_PERSISTENT)
end
function ____exports.familiarFrenzy(self)
    if g.run.pills.familiarFrenzy == 0 then
        return
    end
    local numFamiliars = 10
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        numFamiliars = numFamiliars * 2
    end
    do
        local i = 0
        while i < numFamiliars do
            g.p:UseActiveItem(CollectibleType.COLLECTIBLE_MONSTER_MANUAL, false, false, false, false)
            i = i + 1
        end
    end
end
function ____exports.main(self)
    g.l = g.g:GetLevel()
    g.r = g.g:GetRoom()
    g.p = g.g:GetPlayer(0)
    g.seeds = g.g:GetSeeds()
    g.itemPool = g.g:GetItemPool()
    local gameFrameCount = g.g:GetFrameCount()
    local stage = g.l:GetStage()
    local stageType = g.l:GetStageType()
    if ((gameFrameCount == 0) or (g.run.currentFloor ~= stage)) or (g.run.currentFloorType ~= stageType) then
        return
    end
    ____exports.newRoom(nil)
end
return ____exports
end,
["callbacks.postNewLevel"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local ____GlobalsRunLevel = require("types.GlobalsRunLevel")
local GlobalsRunLevel = ____GlobalsRunLevel.default
local postNewRoom = require("callbacks.postNewRoom")
local theWafer, holyMantleNerfed
function ____exports.newLevel(self)
    local gameFrameCount = g.g:GetFrameCount()
    local stage = g.l:GetStage()
    local stageType = g.l:GetStageType()
    if (gameFrameCount ~= 0) and (gameFrameCount == g.run.currentFloorFrame) then
        return
    end
    g.run.currentFloor = stage
    g.run.currentFloorType = stageType
    g.run.currentFloorFrame = gameFrameCount
    g.run.level = __TS__New(GlobalsRunLevel)
    local stageSeed = g.seeds:GetStageSeed(stage)
    g.run.sunCardRNG = stageSeed
    theWafer(nil)
    holyMantleNerfed(nil)
    postNewRoom:newRoom()
end
function theWafer(self)
    if not g.run.wafer then
        return
    end
    g.run.waferCounters = 2
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_WAFER) then
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_WAFER, 0, false)
        Isaac.DebugString("Removing collectible 108 (The Wafer)")
    end
end
function holyMantleNerfed(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED) then
        return
    end
    g.run.holyMantle = true
end
function ____exports.main(self)
    local gameFrameCount = g.g:GetFrameCount()
    if gameFrameCount == 0 then
        return
    end
    ____exports.newLevel(nil)
end
return ____exports
end,
["callbacks.postGameStarted"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local REMOVED_TRINKETS = ____constants.REMOVED_TRINKETS
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local pills = require("pills")
local postItemPickup = require("postItemPickup")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local TrinketTypeCustom = ____enums_2Ecustom.TrinketTypeCustom
local ____GlobalsRun = require("types.GlobalsRun")
local GlobalsRun = ____GlobalsRun.default
local postNewLevel = require("callbacks.postNewLevel")
local checkVanillaStartingItems, addStartingItems, trinkets, initPills
function checkVanillaStartingItems(self)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_DUALITY) then
        if (Isaac.GetChallenge() == Challenge.CHALLENGE_NULL) and g.seeds:IsCustomRun() then
            g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_DUALITY)
            g.p:AddCollectible(CollectibleType.COLLECTIBLE_SAD_ONION, 0, false)
            Isaac.DebugString("Eden has started with Duality; removing it.")
            Isaac.DebugString("Removing collectible 498 (Duality)")
        else
            RacingPlusGlobals.run.restart = true
            Isaac.DebugString("Restarting because Eden started with Duality.")
            return
        end
    end
    do
        local i = 1
        while i <= misc:getTotalItemCount() do
            if g.p:HasCollectible(i) then
                local postItemPickupFunction = postItemPickup.functionMap:get(i)
                if postItemPickupFunction ~= nil then
                    postItemPickupFunction(nil)
                end
            end
            i = i + 1
        end
    end
    local schoolbagItem = RacingPlusGlobals.run.schoolbag.item
    if schoolbagItem == CollectibleType.COLLECTIBLE_POOP then
        RacingPlusSchoolbag:Put(CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP)
    elseif schoolbagItem == CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD then
        RacingPlusSchoolbag:Put(CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED)
    elseif schoolbagItem == CollectibleType.COLLECTIBLE_MEGA_SATANS_BREATH then
        RacingPlusSchoolbag:Put(CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE)
    end
    if g.p:HasTrinket(TrinketType.TRINKET_WALNUT) then
        g.p:TryRemoveTrinket(TrinketType.TRINKET_WALNUT)
        g.p:AddTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED)
    end
end
function addStartingItems(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM) then
        g.p:AddCollectible(CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM, 0, false)
    end
    g.itemPool:RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_SCHOOLBAG_CUSTOM)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_DUALITY) then
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_DUALITY, 0, false)
    end
    Isaac.DebugString("Removing collectible 498 (Duality)")
    g.p:RemoveCostume(
        g.itemConfig:GetCollectible(CollectibleType.COLLECTIBLE_DUALITY)
    )
    g.itemPool:RemoveCollectible(CollectibleType.COLLECTIBLE_DUALITY)
    local character = g.p:GetPlayerType()
    if character == PlayerType.PLAYER_LILITH then
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_INCUBUS, 0, false)
        g.itemPool:RemoveCollectible(CollectibleType.COLLECTIBLE_INCUBUS)
        Isaac.DebugString("Removing collectible 360 (Incubus)")
        RacingPlusGlobals.run.extraIncubus = true
    end
end
function trinkets(self)
    for ____, trinket in ipairs(REMOVED_TRINKETS) do
        if g.p:HasTrinket(trinket) then
            g.p:TryRemoveTrinket(trinket)
        end
        g.itemPool:RemoveTrinket(trinket)
    end
    if g.p:HasTrinket(TrinketType.TRINKET_WALNUT) then
        g.p:TryRemoveTrinket(TrinketType.TRINKET_WALNUT)
        g.p:AddTrinket(TrinketTypeCustom.TRINKET_WALNUT_IMPROVED)
    end
    g.itemPool:RemoveTrinket(TrinketType.TRINKET_WALNUT)
end
function initPills(self)
    local seed = g.seeds:GetStartSeed()
    local chosenEffectIndexes = {}
    for ____, pillColor in ipairs(pills.COLORS) do
        local randomEffectIndex
        repeat
            do
                seed = misc:incrementRNG(seed)
                math.randomseed(seed)
                randomEffectIndex = math.random(0, #pills.EFFECTS - 1)
            end
        until not __TS__ArrayIncludes(chosenEffectIndexes, randomEffectIndex)
        __TS__ArrayPush(chosenEffectIndexes, randomEffectIndex)
        local pillEffect = pills.EFFECTS[randomEffectIndex + 1]
        g.run.pills.effects:set(pillColor, pillEffect)
    end
end
function ____exports.main(self, saveState)
    local startSeed = g.seeds:GetStartSeed()
    if saveState then
        return
    end
    if RacingPlusGlobals == nil then
        return
    end
    g.run = __TS__New(GlobalsRun)
    g.run:init(startSeed)
    checkVanillaStartingItems(nil)
    addStartingItems(nil)
    trinkets(nil)
    initPills(nil)
    g.itemPool:RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_DADS_LOST_COIN_CUSTOM)
    g.g:SetStateFlag(GameStateFlag.STATE_KRAMPUS_SPAWNED, true)
    g.p:AddCacheFlags(CacheFlag.CACHE_ALL)
    g.p:EvaluateItems()
    postNewLevel:newLevel()
end
return ____exports
end,
["callbacks.postKnifeUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.main(self, knife)
    if g.run.knifeCooldownFrames > 0 then
        return
    end
    local isFlying = knife:IsFlying()
    local flyingLastFrame = g.run.room.knifeFlying:get(knife.Index)
    if flyingLastFrame == nil then
        g.run.room.knifeFlying:set(knife.Index, isFlying)
        g.run.room.knifePositions:set(
            knife.Index,
            Vector(knife.Position.X, knife.Position.Y)
        )
        return
    end
    if isFlying and (not flyingLastFrame) then
        local lastKnifePosition = g.run.room.knifePositions:get(knife.Index)
        if lastKnifePosition == nil then
            lastKnifePosition = Vector(knife.Position.X, knife.Position.Y)
        end
        local velocity = knife.Position:__sub(lastKnifePosition)
        local fakeTear = g.p:FireTear(g.p.Position, velocity, false, true, false)
        fakeTear:Remove()
        g.run.familiarMultiShot = 3
        if g.p:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
            g.run.familiarMultiShot = 0
        end
        g.run.familiarMultiShotVelocity = velocity
        g.run.knifeCooldownFrames = 45
    end
    g.run.room.knifeFlying:set(knife.Index, isFlying)
    g.run.room.knifePositions:set(
        knife.Index,
        Vector(knife.Position.X, knife.Position.Y)
    )
end
return ____exports
end,
["callbacks.postLaserInit"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local isaacsHeart
function isaacsHeart(self, laser)
    if not g.run.spawningIsaacsHeartLaser then
        return
    end
    laser.Visible = false
end
function ____exports.main(self, laser)
    isaacsHeart(nil, laser)
end
return ____exports
end,
["callbacks.postLaserUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local FAMILIAR_TEAR_DAMAGE = ____constants.FAMILIAR_TEAR_DAMAGE
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local lilBrimstone, isaacsHeart, mawOfTheVoid, technology25, familiarLaser, friendlyFade
function lilBrimstone(self, laser)
    if ((laser.FrameCount == 0) and (laser.SpawnerType == EntityType.ENTITY_FAMILIAR)) and (laser.SpawnerVariant == FamiliarVariant.LIL_BRIMSTONE) then
        laser.CollisionDamage = 3 + (g.p.Damage * FAMILIAR_TEAR_DAMAGE)
    end
end
function isaacsHeart(self, laser)
    if (((laser.FrameCount >= 3) or (laser.Variant ~= 1)) or (laser.SpawnerType ~= EntityType.ENTITY_PLAYER)) or (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART)) then
        return
    end
    local hearts = Isaac.FindByType(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ISAACS_HEART, -1, false, false)
    if #hearts == 0 then
        return
    end
    if laser.FrameCount == 1 then
        laser.Parent = hearts[1]
    elseif laser.FrameCount == 2 then
        laser.Visible = true
        g.sfx:Play(SoundEffect.SOUND_BLOOD_LASER_LARGE, 0.75, 0, false, 1)
    end
end
function mawOfTheVoid(self, laser)
    if (laser.BlackHpDropChance > 0.04) and (laser.BlackHpDropChance < 0.06) then
        laser.CollisionDamage = g.p.Damage * 0.75
        laser:SetBlackHpDropChance(0)
    end
end
function technology25(self, laser)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5) then
        return
    end
    local data = laser:GetData()
    if (data == nil) or (data.ring ~= true) then
        return
    end
    laser.Position = g.p.Position
end
function familiarLaser(self, laser)
    if (laser.FrameCount ~= 0) or (laser.SpawnerType ~= EntityType.ENTITY_PLAYER) then
        return
    end
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_EPIC_FETUS) then
        return
    end
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE) and g.p:HasCollectible(CollectibleType.COLLECTIBLE_TRISAGION) then
        return
    end
    if ((laser.Variant == 2) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECHNOLOGY))) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X)) then
        return
    end
    if (laser.Variant == 2) and (laser.SubType == 4) then
        return
    end
    if ((laser.Variant ~= 1) and (laser.Variant ~= 2)) and (laser.Variant ~= 9) then
        return
    end
    local velocity = Vector(g.p.ShotSpeed * 10, 0):Rotated(laser.AngleDegrees)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X) then
        velocity = misc:getVelocityFromAimDirection()
    end
    local fakeTear = g.p:FireTear(g.p.Position, velocity, false, true, false)
    fakeTear:Remove()
    if ((laser.Variant == 1) or (laser.Variant == 9)) and (not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TECH_X)) then
        g.run.familiarMultiShot = 3
        if g.p:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
            g.run.familiarMultiShot = 0
        end
        g.run.familiarMultiShotVelocity = velocity
    end
end
function friendlyFade(self, laser)
    if not laser:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) then
        return
    end
    local color = laser:GetColor()
    local fadeAmount = 0.25
    local newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0)
    laser:SetColor(newColor, 0, 0, true, true)
end
function ____exports.main(self, laser)
    lilBrimstone(nil, laser)
    isaacsHeart(nil, laser)
    mawOfTheVoid(nil, laser)
    technology25(nil, laser)
    familiarLaser(nil, laser)
    friendlyFade(nil, laser)
end
return ____exports
end,
["callbacks.postPickupInit"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.tarotCard(self, pickup)
    if (((((((pickup.SubType >= Card.CARD_FOOL) and (pickup.SubType <= Card.RUNE_ALGIZ)) or (pickup.SubType == Card.CARD_CHAOS)) or (pickup.SubType == Card.CARD_RULES)) or (pickup.SubType == Card.CARD_SUICIDE_KING)) or (pickup.SubType == Card.CARD_GET_OUT_OF_JAIL)) or (pickup.SubType == Card.CARD_QUESTIONMARK)) or ((pickup.SubType >= Card.CARD_HUGE_GROWTH) and (pickup.SubType <= Card.CARD_ERA_WALK)) then
        local sprite = pickup:GetSprite()
        sprite:ReplaceSpritesheet(
            0,
            ("gfx/cards/" .. tostring(pickup.SubType)) .. ".png"
        )
        sprite:LoadGraphics()
    end
end
return ____exports
end,
["callbacks.postPickupRender"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local shopItemNumbersYellow = Sprite()
shopItemNumbersYellow:Load("gfx/005.150_shop item custom.anm2", true)
shopItemNumbersYellow:Play("NumbersYellow", true)
function ____exports.collectible(self, pickup)
    if pickup.Price <= 0 then
        return
    end
    local sprite = pickup:GetSprite()
    sprite:SetLayerFrame(0, -1)
    local position = Isaac.WorldToRenderPosition(pickup.Position)
    if pickup.Price >= 10 then
        shopItemNumbersYellow:SetLayerFrame(0, 1)
        shopItemNumbersYellow:SetLayerFrame(1, pickup.Price - 10)
        shopItemNumbersYellow:SetLayerFrame(2, 10)
        shopItemNumbersYellow:RenderLayer(0, position)
        shopItemNumbersYellow:RenderLayer(1, position)
        shopItemNumbersYellow:RenderLayer(2, position)
    else
        shopItemNumbersYellow:SetLayerFrame(0, pickup.Price)
        shopItemNumbersYellow:SetLayerFrame(1, 10)
        shopItemNumbersYellow:RenderLayer(
            0,
            position:__add(
                Vector(11, 0)
            )
        )
        shopItemNumbersYellow:RenderLayer(
            1,
            position:__add(
                Vector(9, 1)
            )
        )
    end
end
return ____exports
end,
["items.catalog"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local CATALOG_ITEM_PRICE, CATALOG_ILLEGAL_ROOM_TYPES
function ____exports.spawnItem(self, position)
    g.run.catalogRNG = misc:incrementRNG(g.run.catalogRNG)
    local item = g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, position, g.zeroVector, nil, 0, g.run.catalogRNG):ToPickup()
    item.Price = CATALOG_ITEM_PRICE
end
function ____exports.inIllegalRoomType(self)
    local roomType = g.r:GetType()
    return __TS__ArrayIncludes(CATALOG_ILLEGAL_ROOM_TYPES, roomType)
end
CATALOG_ITEM_PRICE = 10
CATALOG_ILLEGAL_ROOM_TYPES = {RoomType.ROOM_SHOP, RoomType.ROOM_CURSE, RoomType.ROOM_DEVIL, RoomType.ROOM_ANGEL, RoomType.ROOM_BLACK_MARKET}
function ____exports.useItem(self)
    local position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
    ____exports.spawnItem(nil, position)
    return true
end
function ____exports.preUseItem(self)
    local gameFrameCount = g.g:GetFrameCount()
    if ____exports.inIllegalRoomType(nil) then
        g.p:AnimateSad()
        RacingPlusGlobals.run.rechargeItemFrame = gameFrameCount + 1
        return true
    end
    return false
end
return ____exports
end,
["callbacks.postPickupUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local catalog = require("items.catalog")
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleState = ____enums_2Ecustom.CollectibleState
local TrinketTypeCustom = ____enums_2Ecustom.TrinketTypeCustom
local postNewRoom = require("callbacks.postNewRoom")
local checkTouched, touched, touchedEtherealPenny, heartRelic, heartCheckDDReroll, heartCheckCatalogReroll, collectibleCheckDouble
function checkTouched(self, pickup)
    local sprite = pickup:GetSprite()
    local data = pickup:GetData()
    if sprite:IsPlaying("Collect") and (data.touched == nil) then
        data.touched = true
        Isaac.DebugString(
            ((((("Touched pickup. " .. tostring(pickup.Type)) .. ".") .. tostring(pickup.Variant)) .. ".") .. tostring(pickup.SubType)) .. " (RPR)"
        )
        touched(nil, pickup)
    end
end
function touched(self, pickup)
    touchedEtherealPenny(nil, pickup)
end
function touchedEtherealPenny(self, pickup)
    if (pickup.Variant ~= PickupVariant.PICKUP_COIN) or (not g.p:HasTrinket(TrinketTypeCustom.TRINKET_ETHEREAL_PENNY)) then
        return
    end
    g.run.etherealPennyRNG = misc:incrementRNG(g.run.etherealPennyRNG)
    math.randomseed(g.run.etherealPennyRNG)
    local slotChoice = math.random(1, 5)
    if slotChoice ~= 1 then
        return
    end
    local position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
    g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_HEART, position, g.zeroVector, nil, HeartSubType.HEART_HALF_SOUL, g.run.etherealPennyRNG)
end
function heartRelic(self, pickup)
    if ((pickup.SubType == HeartSubType.HEART_SOUL) and (pickup.SpawnerType == EntityType.ENTITY_FAMILIAR)) and (pickup.SpawnerVariant == FamiliarVariant.RELIC) then
        g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_HEART, pickup.Position, pickup.Velocity, pickup.SpawnerEntity, HeartSubType.HEART_HALF_SOUL, pickup.InitSeed)
        pickup:Remove()
    end
end
function heartCheckDDReroll(self, pickup)
    local roomType = g.r:GetType()
    if (((pickup.FrameCount == 1) and (pickup.SubType == HeartSubType.HEART_FULL)) and (pickup.Price == 3)) and (roomType == RoomType.ROOM_CURSE) then
        postNewRoom:spawnCurseRoomPedestalItem()
        pickup:Remove()
    end
end
function heartCheckCatalogReroll(self, pickup)
    if (((pickup.FrameCount == 1) and (pickup.SubType == HeartSubType.HEART_FULL)) and (pickup.Price == 3)) and (not catalog:inIllegalRoomType()) then
        catalog:spawnItem(pickup.Position)
        pickup:Remove()
    end
end
function collectibleCheckDouble(self, pickup)
    if not g.run.level.doubleItems then
        return
    end
    local gameFrameCount = g.g:GetFrameCount()
    if ((g.r:IsFirstVisit() and (pickup.FrameCount == 2)) and (pickup.State ~= 2)) and ((g.run.room.doubleItemsFrame == 0) or (g.run.room.doubleItemsFrame == gameFrameCount)) then
        local position = g.r:FindFreePickupSpawnPosition(pickup.Position, 1, true)
        g.run.randomSeed = misc:incrementRNG(g.run.randomSeed)
        local pedestal = g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, position, g.zeroVector, nil, 0, g.run.randomSeed):ToPickup()
        pedestal.Price = pickup.Price
        pedestal.TheresOptionsPickup = pickup.TheresOptionsPickup
        pedestal.State = CollectibleState.DUPLICATED
        g.run.room.doubleItemsFrame = gameFrameCount
    end
end
function ____exports.main(self, pickup)
    checkTouched(nil, pickup)
end
function ____exports.heart(self, pickup)
    heartRelic(nil, pickup)
    heartCheckDDReroll(nil, pickup)
    heartCheckCatalogReroll(nil, pickup)
end
function ____exports.collectible(self, pickup)
    collectibleCheckDouble(nil, pickup)
end
return ____exports
end,
["callbacks.postPlayerInit"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.main(self, player)
    if player.Variant ~= 0 then
        return
    end
    g.p = player
end
return ____exports
end,
["callbacks.postProjectileUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
function ____exports.main(self, projectile)
    if not projectile:HasEntityFlags(EntityFlag.FLAG_FRIENDLY) then
        return
    end
    local color = projectile:GetColor()
    local fadeAmount = 0.25
    local newColor = Color(color.R, color.G, color.B, fadeAmount, 0, 0, 0)
    projectile:SetColor(newColor, 0, 0, true, true)
end
return ____exports
end,
["callbacks.postRender"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local checkRacingPlus
function checkRacingPlus(self)
    if g.racingPlusEnabled then
        return
    end
    local x = 115
    local y = 70
    local text = "Error. The Racing+ Rebalanced mod requires"
    Isaac.RenderText(text, x, y, 2, 2, 2, 2)
    x = x + 42
    y = y + 10
    text = "that you also enable the Racing+ mod."
    Isaac.RenderText(text, x, y, 2, 2, 2, 2)
end
function ____exports.main(self)
    g.l = g.g:GetLevel()
    g.r = g.g:GetRoom()
    g.p = g.g:GetPlayer(0)
    g.seeds = g.g:GetSeeds()
    g.itemPool = g.g:GetItemPool()
    checkRacingPlus(nil)
end
return ____exports
end,
["callbacks.postTearUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____constants = require("constants")
local FAMILIAR_TEAR_DAMAGE = ____constants.FAMILIAR_TEAR_DAMAGE
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local bobsRottenHead, demonBaby, abel, tinyPlanet, explosivo, lilMonstro, fireMindImproved
function bobsRottenHead(self, tear)
    if (tear.Variant == TearVariant.BOBS_HEAD) and (tear.FrameCount == 1) then
        tear.TearFlags = tear.TearFlags | TearFlags.TEAR_SAD_BOMB
        g.p:SetActiveCharge(1)
    end
end
function demonBaby(self, tear)
    if ((tear.FrameCount == 1) and (tear.SpawnerType == EntityType.ENTITY_FAMILIAR)) and (tear.SpawnerVariant == FamiliarVariant.DEMON_BABY) then
        tear.CollisionDamage = 7 + (g.p.Damage * 0.33)
    end
end
function abel(self, tear)
    if ((tear.SpawnerType == EntityType.ENTITY_FAMILIAR) and (tear.SpawnerVariant == FamiliarVariant.ABEL)) and (tear.CollisionDamage == 3.5) then
        tear:Remove()
    end
end
function tinyPlanet(self, tear)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) then
        return
    end
    if tear.SubType == 0 then
        return
    end
    local distance = 90
    local positionMod = Vector(0, distance * -1)
    local frameCount = tear.FrameCount
    local direction = tear.SubType - 1
    local degreesPerFrame = 8
    local degrees = frameCount * degreesPerFrame
    if direction == Direction.RIGHT then
        degrees = degrees + 90
    elseif direction == Direction.DOWN then
        degrees = degrees + 180
    elseif direction == Direction.LEFT then
        degrees = degrees + 270
    end
    positionMod = positionMod:Rotated(degrees)
    tear.Position = g.p.Position:__add(positionMod)
    tear.Velocity = Vector(distance / 4, 0)
    tear.Velocity = tear.Velocity:Rotated(degrees)
    if tear.FrameCount < 150 then
        tear.FallingSpeed = 0
    end
end
function explosivo(self, tear)
    if tear.Variant ~= TearVariant.EXPLOSIVO then
        return
    end
    if tear.StickTimer == 89 then
        tear.StickTimer = 29
    end
end
function lilMonstro(self, tear)
    if ((tear.FrameCount == 1) and (tear.SpawnerType == EntityType.ENTITY_FAMILIAR)) and (tear.SpawnerVariant == FamiliarVariant.LIL_MONSTRO) then
        tear.CollisionDamage = g.p.Damage * FAMILIAR_TEAR_DAMAGE
        tear.Velocity = tear.Velocity:__mul(2)
    end
end
function fireMindImproved(self, tear)
    if ((not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED)) or (tear.SubType ~= 1)) or ((tear.FrameCount % 2) ~= 0) then
        return
    end
    local fire = Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.HOT_BOMB_FIRE, 0, tear.Position, g.zeroVector, nil)
    fire.SpriteScale = Vector(0.5, 0.5)
    local color = fire:GetColor()
    local fadeAmount = 0.5
    local newColor = Color(color.R, color.G, color.B, fadeAmount, color.RO, color.GO, color.BO)
    fire:SetColor(newColor, 0, 0, true, true)
end
function ____exports.main(self, tear)
    bobsRottenHead(nil, tear)
    demonBaby(nil, tear)
    abel(nil, tear)
    tinyPlanet(nil, tear)
    explosivo(nil, tear)
    lilMonstro(nil, tear)
    fireMindImproved(nil, tear)
end
return ____exports
end,
["roomCleared"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local chargedBaby
function chargedBaby(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_CHARGED_BABY) then
        return
    end
    local ____obj, ____index = g.run, "chargedBabyCounters"
    ____obj[____index] = ____obj[____index] + 1
    if g.run.chargedBabyCounters ~= 4 then
        return
    end
    g.run.chargedBabyCounters = 0
    local chargedBabies = Isaac.FindByType(EntityType.ENTITY_FAMILIAR, FamiliarVariant.CHARGED_BABY, -1, false, false)
    for ____, chargedBabyEntity in ipairs(chargedBabies) do
        Isaac.Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_LIL_BATTERY, 0, chargedBabyEntity.Position, g.zeroVector, nil)
    end
end
function ____exports.main(self)
    chargedBaby(nil)
end
return ____exports
end,
["slotRewardFunctionMap"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local ____enums_2Ecustom = require("types.enums.custom")
local SlotVariantCustom = ____enums_2Ecustom.SlotVariantCustom
local spawnCoin, spawn3Coins
function spawnCoin(self, slot)
    Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_COIN,
        0,
        slot.Position,
        RandomVector(nil):__mul(3),
        slot
    )
end
function spawn3Coins(self, slot)
    do
        local i = 0
        while i < 3 do
            spawnCoin(nil, slot)
            i = i + 1
        end
    end
    return true
end
local slotRewardFunctionMap = __TS__New(Map)
____exports.default = slotRewardFunctionMap
slotRewardFunctionMap:set(
    SlotVariantCustom.TRANSMUTATION_MACHINE,
    function()
        g.p:UseActiveItem(CollectibleType.COLLECTIBLE_D6, false, false, false, false)
        return true
    end
)
slotRewardFunctionMap:set(SlotVariantCustom.BOMB_DONATION_MACHINE, spawn3Coins)
slotRewardFunctionMap:set(SlotVariantCustom.KEY_DONATION_MACHINE, spawn3Coins)
slotRewardFunctionMap:set(
    SlotVariantCustom.ROULETTE_TABLE,
    function(____, slot)
        g.run.rouletteTableRNG = misc:incrementRNG(g.run.rouletteTableRNG)
        math.randomseed(g.run.rouletteTableRNG)
        local success = math.random(1, 10)
        if success <= 4 then
            do
                local i = 0
                while i < 10 do
                    spawnCoin(nil, slot)
                    i = i + 1
                end
            end
            return true
        end
        g.p:AnimateSad()
        return false
    end
)
slotRewardFunctionMap:set(
    SlotVariantCustom.HOLY_MACHINE,
    function(____, slot)
        Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.HEAVEN_LIGHT_DOOR, 0, slot.Position, g.zeroVector, slot)
        slot:GetSprite():Play("Death", true)
        return true
    end
)
return ____exports
end,
["slotTouchedFunctionMap"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local SlotVariantCustom = ____enums_2Ecustom.SlotVariantCustom
local touchSuccess
function touchSuccess(self, sprite)
    g.sfx:Play(SoundEffect.SOUND_COIN_SLOT, 1, 0, false, 1)
    sprite:Play("Initiate", true)
end
local slotRewardTouchedMap = __TS__New(Map)
____exports.default = slotRewardTouchedMap
slotRewardTouchedMap:set(
    SlotVariantCustom.TRANSMUTATION_MACHINE,
    function(____, slot)
        g.p:TakeDamage(
            1,
            DamageFlag.DAMAGE_RED_HEARTS,
            EntityRef(slot),
            0
        )
        touchSuccess(
            nil,
            slot:GetSprite()
        )
    end
)
slotRewardTouchedMap:set(
    SlotVariantCustom.BOMB_DONATION_MACHINE,
    function(____, slot)
        local numBombs = g.p:GetNumBombs()
        local price = 1
        if numBombs < price then
            return
        end
        g.p:AddBombs(-price)
        touchSuccess(
            nil,
            slot:GetSprite()
        )
    end
)
slotRewardTouchedMap:set(
    SlotVariantCustom.KEY_DONATION_MACHINE,
    function(____, slot)
        local numKeys = g.p:GetNumKeys()
        local price = 1
        if numKeys < price then
            return
        end
        g.p:AddKeys(-price)
        touchSuccess(
            nil,
            slot:GetSprite()
        )
    end
)
slotRewardTouchedMap:set(
    SlotVariantCustom.ROULETTE_TABLE,
    function(____, slot)
        local numCoins = g.p:GetNumCoins()
        local price = 5
        if numCoins < price then
            return
        end
        g.p:AddCoins(-price)
        touchSuccess(
            nil,
            slot:GetSprite()
        )
    end
)
slotRewardTouchedMap:set(
    SlotVariantCustom.HOLY_MACHINE,
    function(____, slot)
        local numCoins = g.p:GetNumCoins()
        local price = 20
        if numCoins < price then
            return
        end
        g.p:AddCoins(-price)
        touchSuccess(
            nil,
            slot:GetSprite()
        )
    end
)
return ____exports
end,
["slots"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____slotRewardFunctionMap = require("slotRewardFunctionMap")
local slotRewardFunctionMap = ____slotRewardFunctionMap.default
local ____slotTouchedFunctionMap = require("slotTouchedFunctionMap")
local slotTouchedFunctionMap = ____slotTouchedFunctionMap.default
function ____exports.postUpdate(self)
    local slots = Isaac.FindByType(EntityType.ENTITY_SLOT, -1, -1, false, false)
    for ____, slot in ipairs(slots) do
        if slot.Variant > 12 then
            local sprite = slot:GetSprite()
            if sprite:IsFinished("Initiate") then
                sprite:Play("Wiggle", true)
            end
            if sprite:IsFinished("Wiggle") then
                sprite:Play("Prize", true)
                local rewardFunction = slotRewardFunctionMap:get(slot.Variant)
                if rewardFunction ~= nil then
                    local success = rewardFunction(nil, slot)
                    if success then
                        g.sfx:Play(SoundEffect.SOUND_BLOODBANK_SPAWN, 1, 0, false, 1)
                        g.sfx:Play(SoundEffect.SOUND_SLOTSPAWN, 1, 0, false, 1)
                    end
                end
            end
            if sprite:IsFinished("Prize") then
                sprite:Play("Idle", true)
            end
            if sprite:IsFinished("Death") then
                sprite:Play("Broken", true)
            end
            local exploded = slot.GridCollisionClass == EntityGridCollisionClass.GRIDCOLL_GROUND
            if exploded then
                if (not sprite:IsPlaying("Death")) and (not sprite:IsPlaying("Broken")) then
                    sprite:Play("Death", true)
                end
            elseif sprite:IsPlaying("Idle") and (slot.Position:Distance(g.p.Position) <= (slot.Size + g.p.Size)) then
                local touchedFunction = slotTouchedFunctionMap:get(slot.Variant)
                if touchedFunction ~= nil then
                    touchedFunction(nil, slot)
                end
            end
        end
    end
end
return ____exports
end,
["callbacks.postUpdateCollectible"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____constants = require("constants")
local SHOP_PRICES = ____constants.SHOP_PRICES
local TWO_HEART_ITEMS = ____constants.TWO_HEART_ITEMS
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleState = ____enums_2Ecustom.CollectibleState
local checkDDPrice, getDDPrice, checkShopPrice, getPrice, checkSetBossItem
function checkDDPrice(self, pickup)
    local roomType = g.r:GetType()
    if ((roomType ~= RoomType.ROOM_CURSE) and (roomType ~= RoomType.ROOM_DEVIL)) and (roomType ~= RoomType.ROOM_BLACK_MARKET) then
        return
    end
    if (pickup.Price == 0) or (pickup.Price == PickupPrice.PRICE_FREE) then
        return
    end
    local DDPrice = getDDPrice(nil, pickup.SubType)
    if pickup.Price ~= DDPrice then
        pickup.AutoUpdatePrice = false
        pickup.Price = DDPrice
    end
end
function getDDPrice(self, subType)
    local maxHearts = g.p:GetMaxHearts()
    if maxHearts == 0 then
        return -3
    end
    if g.p:HasTrinket(TrinketType.TRINKET_JUDAS_TONGUE) then
        return -1
    end
    if __TS__ArrayIncludes(TWO_HEART_ITEMS, subType) then
        return -2
    end
    return -1
end
function checkShopPrice(self, pickup)
    if (((pickup.Price == 0) or (pickup.Price == PickupPrice.PRICE_ONE_HEART)) or (pickup.Price == PickupPrice.PRICE_TWO_HEARTS)) or (pickup.Price == PickupPrice.PRICE_THREE_SOULHEARTS) then
        return
    end
    local price = getPrice(nil, pickup)
    if pickup.Price ~= price then
        pickup.AutoUpdatePrice = false
        pickup.Price = price
    end
end
function getPrice(self, pickup)
    local numSteamSales = g.p:GetCollectibleNum(CollectibleType.COLLECTIBLE_STEAM_SALE)
    if g.p:HasTrinket(TrinketType.TRINKET_STORE_CREDIT) then
        return PickupPrice.PRICE_FREE
    end
    if numSteamSales == 2 then
        return PickupPrice.PRICE_FREE
    end
    local price
    local shopPrice = SHOP_PRICES:get(pickup.SubType)
    if shopPrice == nil then
        price = 15
    else
        price = shopPrice
    end
    if numSteamSales == 1 then
        price = math.floor(price / 2)
    end
    return price
end
function checkSetBossItem(self, pedestal)
    local roomType = g.r:GetType()
    if roomType ~= RoomType.ROOM_BOSS then
        return
    end
    if ((((((pedestal.SubType == CollectibleType.COLLECTIBLE_CUBE_OF_MEAT) or (pedestal.SubType == CollectibleType.COLLECTIBLE_LITTLE_CHAD)) or (pedestal.SubType == CollectibleType.COLLECTIBLE_LITTLE_GISH)) or (pedestal.SubType == CollectibleType.COLLECTIBLE_LITTLE_STEVEN)) or (pedestal.SubType == CollectibleType.COLLECTIBLE_PONY)) or (pedestal.SubType == CollectibleType.COLLECTIBLE_WHITE_PONY)) or (pedestal.SubType == CollectibleType.COLLECTIBLE_BALL_OF_BANDAGES) then
        local newEntity = g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, pedestal.Position, pedestal.Velocity, pedestal.Parent, 0, pedestal.InitSeed)
        local newPedestal = newEntity:ToPickup()
        newPedestal.TheresOptionsPickup = pedestal.TheresOptionsPickup
        pedestal:Remove()
    end
end
____exports.default = function()
    local pedestals = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, -1, false, false)
    for ____, pedestal in ipairs(pedestals) do
        local pickup = pedestal:ToPickup()
        if (pickup.SubType ~= CollectibleType.COLLECTIBLE_NULL) and (pickup.State ~= CollectibleState.NORMAL) then
            checkDDPrice(nil, pickup)
            checkShopPrice(nil, pickup)
            checkSetBossItem(nil, pickup)
        end
    end
end
return ____exports
end,
["callbacks.postUpdate"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local technology = require("items.technology")
local misc = require("misc")
local postItemPickup = require("postItemPickup")
local roomCleared = require("roomCleared")
local slots = require("slots")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local TrinketTypeCustom = ____enums_2Ecustom.TrinketTypeCustom
local ____postUpdateCollectible = require("callbacks.postUpdateCollectible")
local postUpdateCollectible = ____postUpdateCollectible.default
local recordHealth, checkRoomCleared, checkItemPickup, checkTransformations, checkFamiliarMultiShot, monstrosTooth, momsKnife, nineVolt, theBlackBean, tinyPlanet, isaacsHeart, judasShadow, mongoBaby, fartingBaby, blackPowder, brownNugget, fireMindImproved, holyMantleNerfed, adrenalineImproved, pennyOnAString, checkPillTimer
function recordHealth(self)
    g.run.health.changedOnThisFrame = false
    g.run.lastHealth.hearts = g.run.health.hearts
    local hearts = g.p:GetHearts()
    if hearts ~= g.run.health.hearts then
        g.run.health.hearts = hearts
        g.run.health.changedOnThisFrame = true
    end
    g.run.lastHealth.maxHearts = g.run.health.maxHearts
    local maxHearts = g.p:GetMaxHearts()
    if maxHearts ~= g.run.health.maxHearts then
        g.run.health.maxHearts = maxHearts
        g.run.health.changedOnThisFrame = true
    end
    g.run.lastHealth.soulHearts = g.run.health.soulHearts
    local soulHearts = g.p:GetSoulHearts()
    if soulHearts ~= g.run.health.soulHearts then
        g.run.health.soulHearts = soulHearts
        g.run.health.changedOnThisFrame = true
    end
    g.run.lastHealth.blackHearts = g.run.health.blackHearts
    local blackHearts = g.p:GetBlackHearts()
    if blackHearts ~= g.run.health.blackHearts then
        g.run.health.blackHearts = blackHearts
        g.run.health.changedOnThisFrame = true
    end
    g.run.lastHealth.boneHearts = g.run.health.boneHearts
    local boneHearts = g.p:GetBoneHearts()
    if boneHearts ~= g.run.health.boneHearts then
        g.run.health.boneHearts = boneHearts
        g.run.health.changedOnThisFrame = true
    end
end
function checkRoomCleared(self)
    local roomClear = g.r:IsClear()
    if roomClear == g.run.currentRoomClearState then
        return
    end
    g.run.currentRoomClearState = roomClear
    if not roomClear then
        return
    end
    roomCleared:main()
end
function checkItemPickup(self)
    local roomIndex = misc:getRoomIndex()
    if g.p:IsItemQueueEmpty() then
        if g.run.pickingUpItem ~= 0 then
            if ((g.run.pickingUpItemType == ItemType.ITEM_PASSIVE) or (g.run.pickingUpItemType == ItemType.ITEM_ACTIVE)) or (g.run.pickingUpItemType == ItemType.ITEM_FAMILIAR) then
                local postItemFunction = postItemPickup.functionMap:get(g.run.pickingUpItem)
                if postItemFunction ~= nil then
                    postItemFunction(nil)
                end
            end
            g.run.pickingUpItem = 0
            g.run.pickingUpItemRoom = 0
            g.run.pickingUpItemType = ItemType.ITEM_NULL
        end
        return
    end
    if g.run.pickingUpItem == 0 then
        g.run.pickingUpItem = g.p.QueuedItem.Item.ID
        g.run.pickingUpItemRoom = roomIndex
        g.run.pickingUpItemType = g.p.QueuedItem.Item.Type
    end
end
function checkTransformations(self)
    do
        local i = 0
        while i < 14 do
            local hasPlayerForm = g.p:HasPlayerForm(i)
            local storedHasPlayerForm = g.run.transformations:get(i)
            if storedHasPlayerForm == nil then
                error(
                    __TS__New(
                        Error,
                        "Failed to get the stored player form for: " .. tostring(i)
                    ),
                    0
                )
            end
            if hasPlayerForm ~= storedHasPlayerForm then
                g.run.transformations:set(i, hasPlayerForm)
                if i == 8 then
                    misc:setHealthFromLastFrame()
                    misc:killIfNoHealth()
                end
            end
            i = i + 1
        end
    end
end
function checkFamiliarMultiShot(self)
    if g.run.familiarMultiShot > 0 then
        local ____obj, ____index = g.run, "familiarMultiShot"
        ____obj[____index] = ____obj[____index] - -1
        local fakeTear = g.p:FireTear(g.p.Position, g.run.familiarMultiShotVelocity, false, true, false)
        fakeTear:Remove()
    end
end
function monstrosTooth(self)
    local gameFrameCount = g.g:GetFrameCount()
    local roomClear = g.r:IsClear()
    if (g.run.monstroFrame == 0) or (gameFrameCount < g.run.monstroFrame) then
        return
    end
    if roomClear then
        g.run.monstroCounters = 0
        g.run.monstroFrame = 0
    else
        g.p:UseActiveItem(CollectibleType.COLLECTIBLE_MONSTROS_TOOTH, false, false, false, false)
    end
end
function momsKnife(self)
    if g.run.knifeCooldownFrames > 0 then
        g.run.knifeCooldownFrames = -1
    end
end
function nineVolt(self)
    local gameFrameCount = g.g:GetFrameCount()
    local activeItem = g.p:GetActiveItem()
    if (g.run.nineVoltFrame == 0) or (gameFrameCount <= g.run.nineVoltFrame) then
        return
    end
    g.run.nineVoltFrame = 0
    if activeItem == 0 then
        return
    end
    local maxCharges = g.itemConfig:GetCollectible(activeItem).MaxCharges
    local charge = g.p:GetActiveCharge()
    charge = charge + 1
    if charge > maxCharges then
        charge = maxCharges
    end
    g.p:SetActiveCharge(charge)
end
function theBlackBean(self)
    if g.run.blackBeanEndFrame == 0 then
        return
    end
    local gameFrameCount = g.g:GetFrameCount()
    if gameFrameCount >= g.run.blackBeanEndFrame then
        g.run.blackBeanEndFrame = 0
        return
    end
    if (gameFrameCount % 3) == 0 then
        g.p:UseActiveItem(CollectibleType.COLLECTIBLE_BEAN, false, false, false, false)
    end
end
function tinyPlanet(self)
    local roomFrameCount = g.r:GetFrameCount()
    local roomType = g.r:GetType()
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_TINY_PLANET) then
        return
    end
    if roomType == RoomType.ROOM_BOSS then
        return
    end
    if roomFrameCount < 900 then
        return
    end
    g.run.room.softlock = true
    g.r:SetClear(true)
    do
        local i = 0
        while i <= 7 do
            local door = g.r:GetDoor(i)
            if door ~= nil then
                door:Open()
            end
            i = i + 1
        end
    end
end
function isaacsHeart(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_ISAACS_HEART) then
        return
    end
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE) then
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_BRIMSTONE)
        Isaac.DebugString("Removing collectible 118 (Brimstone)")
    end
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_ANTI_GRAVITY) then
        g.p:RemoveCollectible(CollectibleType.COLLECTIBLE_ANTI_GRAVITY)
        Isaac.DebugString("Removing collectible 222 (Anti-Gravity)")
    end
end
function judasShadow(self)
    local character = g.p:GetPlayerType()
    if (not g.run.judasShadow) and (character == PlayerType.PLAYER_BLACKJUDAS) then
        g.run.judasShadow = true
        g.p:AddSoulHearts(-4)
        g.p:AddMaxHearts(2, false)
        g.p:AddHearts(2)
        g.p:AddSoulHearts(1)
    end
end
function mongoBaby(self)
    local gameFrameCount = g.g:GetFrameCount()
    do
        local i = #g.run.room.mongoBabyTears - 1
        while i >= 0 do
            local tear = g.run.room.mongoBabyTears[i + 1]
            if gameFrameCount >= tear.frame then
                local familiarTear = Isaac.Spawn(EntityType.ENTITY_TEAR, 0, 0, tear.familiar.Position, tear.velocity, nil):ToTear()
                familiarTear.Scale = tear.scale
                familiarTear.CollisionDamage = tear.damage
                __TS__ArraySplice(g.run.room.mongoBabyTears, i, 1)
            end
            i = i - 1
        end
    end
end
function fartingBaby(self)
    local gameFrameCount = g.g:GetFrameCount()
    do
        local i = #g.run.room.fartingBabyShockwaves - 1
        while i >= 0 do
            local shockwave = g.run.room.fartingBabyShockwaves[i + 1]
            if ((gameFrameCount - shockwave.frame) % 2) == 0 then
                local explosion = Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.ROCK_EXPLOSION, 0, shockwave.position, g.zeroVector, g.p)
                local index = g.r:GetGridIndex(shockwave.position)
                g.r:DestroyGrid(index, true)
                g.sfx:Play(SoundEffect.SOUND_ROCK_CRUMBLE, 0.5, 0, false, 1)
                local entities = Isaac.FindInRadius(shockwave.position, 40, EntityPartition.ENEMY)
                for ____, entity in ipairs(entities) do
                    local damage = g.p.Damage * 1.5
                    entity:TakeDamage(
                        damage,
                        DamageFlag.DAMAGE_EXPLOSION,
                        EntityRef(explosion),
                        2
                    )
                end
                shockwave.position = shockwave.position:__add(shockwave.velocity)
            end
            if not g.r:IsPositionInRoom(shockwave.position, 0) then
                __TS__ArraySplice(g.run.room.fartingBabyShockwaves, i, 1)
            end
            i = i - 1
        end
    end
end
function blackPowder(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_BLACK_POWDER) then
        return
    end
    local pentagrams = Isaac.FindByType(EntityType.ENTITY_EFFECT, EffectVariant.PENTAGRAM_BLACKPOWDER, -1, false, false)
    if (#pentagrams > 0) and (not g.run.blackPowderActive) then
        g.run.blackPowderActive = true
        g.p:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
        g.p:EvaluateItems()
    end
    if (#pentagrams == 0) and g.run.blackPowderActive then
        g.run.blackPowderActive = false
        g.p:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
        g.p:EvaluateItems()
    end
end
function brownNugget(self)
    local gameFrameCount = g.g:GetFrameCount()
    if (g.run.brownNuggetFrame == 0) or (gameFrameCount < g.run.brownNuggetFrame) then
        return
    end
    local ____obj, ____index = g.run, "brownNuggetCounters"
    ____obj[____index] = ____obj[____index] + 1
    g.run.brownNuggetFrame = gameFrameCount + 3
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_BROWN_NUGGET, false, false, false, false)
    if g.run.brownNuggetCounters == 9 then
        g.run.brownNuggetCounters = 0
        g.run.brownNuggetFrame = 0
    end
end
function fireMindImproved(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED) then
        return
    end
    if not misc:isOnTearBuild() then
        g.p:RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED)
        Isaac.DebugString(
            ("Removing collectible " .. tostring(CollectibleTypeCustom.COLLECTIBLE_FIRE_MIND_IMPROVED)) .. " (Fire Mind Improved)"
        )
        g.p:AddCollectible(CollectibleType.COLLECTIBLE_FIRE_MIND, 0, false)
    end
end
function holyMantleNerfed(self)
    if (not g.run.holyMantle) or (not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_HOLY_MANTLE_NERFED)) then
        return
    end
    local effects = g.p:GetEffects()
    local numMantleEffects = effects:GetCollectibleEffectNum(CollectibleType.COLLECTIBLE_HOLY_MANTLE)
    if numMantleEffects == 0 then
        g.run.holyMantle = false
    end
end
function adrenalineImproved(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_ADRENALINE_IMPROVED) then
        return
    end
    if g.run.health.changedOnThisFrame then
        g.p:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
        g.p:EvaluateItems()
    end
end
function pennyOnAString(self)
    if not g.p:HasTrinket(TrinketTypeCustom.TRINKET_PENNY_ON_A_STRING) then
        return
    end
    local numCoins = g.p:GetNumCoins()
    if numCoins == (g.run.numCoins - 1) then
        g.p:AddCoins(1)
    end
    g.run.numCoins = g.p:GetNumCoins()
end
function checkPillTimer(self)
    local gameFrameCount = g.g:GetFrameCount()
    if (g.run.pills.superSadness ~= 0) and (gameFrameCount > g.run.pills.superSadness) then
        g.run.pills.superSadness = 0
        g.p:AddCacheFlags(CacheFlag.CACHE_FIREDELAY)
        g.p:EvaluateItems()
    end
    if g.run.pills.invincibility ~= 0 then
        if (gameFrameCount + 60) > g.run.pills.invincibility then
            if (gameFrameCount % 2) == 0 then
                g.p:TryRemoveNullCostume(NullItemID.ID_STATUE)
            else
                g.p:AddNullCostume(NullItemID.ID_STATUE)
            end
        end
        if gameFrameCount > g.run.pills.invincibility then
            g.run.pills.invincibility = 0
            g.p:TryRemoveNullCostume(NullItemID.ID_STATUE)
        end
    end
    if g.run.pills.reallyBadGas ~= 0 then
        if gameFrameCount > g.run.pills.reallyBadGas then
            g.run.pills.reallyBadGas = 0
        else
            local bigChests = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_BIGCHEST, -1, false, false)
            if #bigChests > 0 then
                return
            end
            if misc:hasNoHealth() then
                return
            end
            if (gameFrameCount % 3) == 0 then
                g.p:UseActiveItem(CollectibleType.COLLECTIBLE_BEAN, false, false, false, false)
            end
        end
    end
    if (g.run.pills.aether ~= 0) and (gameFrameCount > g.run.pills.aether) then
        g.run.pills.aether = 0
    end
    if (g.run.pills.wallsHaveEyes ~= 0) and (gameFrameCount > g.run.pills.wallsHaveEyes) then
        g.run.pills.wallsHaveEyes = 0
    end
    if g.run.pills.bladderInfection ~= 0 then
        if gameFrameCount > g.run.pills.bladderInfection then
            g.run.pills.bladderInfection = 0
        else
            local creep = Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.PLAYER_CREEP_LEMON_MISHAP, 0, g.p.Position, g.zeroVector, g.p):ToEffect()
            creep.Scale = 2
            creep.SpriteScale = Vector(2, 2)
            math.randomseed(creep.InitSeed)
            creep:GetSprite():Play(
                "BiggestBlood0" .. tostring(
                    math.random(6)
                ),
                true
            )
            creep:Update()
        end
    end
    if g.run.pills.scorchedEarth > 0 then
        local ____obj, ____index = g.run.pills, "scorchedEarth"
        ____obj[____index] = ____obj[____index] - 1
        Isaac.Spawn(
            EntityType.ENTITY_EFFECT,
            EffectVariant.HOT_BOMB_FIRE,
            0,
            g.r:GetRandomPosition(1),
            g.zeroVector,
            nil
        )
    end
    if (g.run.pills.familiarFrenzy ~= 0) and (gameFrameCount > g.run.pills.familiarFrenzy) then
        g.run.pills.familiarFrenzy = 0
    end
end
function ____exports.main(self)
    recordHealth(nil)
    checkRoomCleared(nil)
    checkItemPickup(nil)
    checkTransformations(nil)
    checkFamiliarMultiShot(nil)
    postUpdateCollectible(nil)
    slots:postUpdate()
    technology:postUpdate()
    monstrosTooth(nil)
    momsKnife(nil)
    nineVolt(nil)
    theBlackBean(nil)
    tinyPlanet(nil)
    isaacsHeart(nil)
    judasShadow(nil)
    mongoBaby(nil)
    fartingBaby(nil)
    blackPowder(nil)
    brownNugget(nil)
    fireMindImproved(nil)
    holyMantleNerfed(nil)
    adrenalineImproved(nil)
    pennyOnAString(nil)
    checkPillTimer(nil)
end
return ____exports
end,
["callbacks.preEntitySpawn"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local PickupVariantCustom = ____enums_2Ecustom.PickupVariantCustom
local collectible
function collectible(self, subType, position, velocity, spawner, initSeed)
    local replacedSubType
    if subType == CollectibleType.COLLECTIBLE_BOBS_ROTTEN_HEAD then
        replacedSubType = CollectibleTypeCustom.COLLECTIBLE_BOBS_ROTTEN_HEAD_IMPROVED
    elseif subType == CollectibleType.COLLECTIBLE_DEAD_CAT then
        replacedSubType = CollectibleType.COLLECTIBLE_ONE_UP
    elseif subType == CollectibleType.COLLECTIBLE_BUCKET_LARD then
        replacedSubType = CollectibleType.COLLECTIBLE_SUPER_BANDAGE
    end
    if replacedSubType ~= nil then
        g.g:Spawn(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, position, velocity, spawner, replacedSubType, initSeed)
        return {EntityType.ENTITY_PICKUP, PickupVariantCustom.INVISIBLE_PICKUP, 0, 0}
    end
    return nil
end
function ____exports.main(self, entityType, variant, subType, position, velocity, spawner, initSeed)
    if (entityType == EntityType.ENTITY_PICKUP) and (variant == PickupVariant.PICKUP_COLLECTIBLE) then
        return collectible(nil, subType, position, velocity, spawner, initSeed)
    end
    return nil
end
return ____exports
end,
["callbacks.preFamiliarCollision"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
function ____exports.momsRazor(self, familiar, collider)
    local npc = collider:ToNPC()
    if npc == nil then
        return nil
    end
    local gameFrameCount = g.g:GetFrameCount()
    local damage = 10
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_BFFS) then
        damage = damage * 2
    end
    if (gameFrameCount % 2) == 0 then
        collider:TakeDamage(
            damage,
            0,
            EntityRef(familiar),
            0
        )
    end
    return true
end
return ____exports
end,
["callbacks.preProjectileCollision"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local fartingBaby
function fartingBaby(self, projectile, collider)
    if (collider.Type ~= EntityType.ENTITY_FAMILIAR) or (collider.Variant ~= FamiliarVariant.FARTING_BABY) then
        return
    end
    local ____obj, ____index = g.run, "fartingBabyCounters"
    ____obj[____index] = ____obj[____index] + 1
    if g.run.fartingBabyCounters ~= 5 then
        return
    end
    g.run.fartingBabyCounters = 0
    local gameFrameCount = g.g:GetFrameCount()
    __TS__ArrayPush(
        g.run.room.fartingBabyShockwaves,
        {
            frame = gameFrameCount,
            position = projectile.Position,
            velocity = projectile.Velocity:__mul(-2)
        }
    )
end
function ____exports.main(self, projectile, collider)
    fartingBaby(nil, projectile, collider)
    return nil
end
return ____exports
end,
["callbacks.preTearCollision"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local lostContact
function lostContact(self, tear, collider)
    if (collider.Type == EntityType.ENTITY_PROJECTILE) and g.p:HasCollectible(CollectibleType.COLLECTIBLE_LOST_CONTACT) then
        g.g:Spawn(tear.Type, tear.Variant, tear.Position, tear.Velocity, tear.SpawnerEntity, tear.SubType, tear.InitSeed)
    end
end
function ____exports.main(self, tear, collider)
    lostContact(nil, tear, collider)
    return nil
end
return ____exports
end,
["callbacks.preUseItem"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
function ____exports.isaacsTears(self)
    local vel = Vector(10, 0)
    do
        local i = 0
        while i < 8 do
            vel = vel:Rotated(45)
            local tear = g.p:FireTear(g.p.Position, vel, false, false, false)
            local buff = 2.5
            tear.CollisionDamage = g.p.Damage * buff
            tear.Scale = buff
            tear.KnockbackMultiplier = 20
            i = i + 1
        end
    end
    g.p:AnimateCollectible(CollectibleType.COLLECTIBLE_ISAACS_TEARS, "UseItem", "PlayerPickup")
    return true
end
function ____exports.voidItem(self)
    local megaBlasts = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_COLLECTIBLE, CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE, false, false)
    if #megaBlasts > 0 then
        g.p:AnimateSad()
        RacingPlusGlobals.run.rechargeItemFrame = g.g:GetFrameCount() + 1
        return true
    end
    return false
end
return ____exports
end,
["path"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
require("lib.astar")
require("lib.tiledmaphandler")
local getCoordsFromGridIndex, getGridIndexFromXY
function getCoordsFromGridIndex(self, gridIndex)
    local y = math.floor(gridIndex / 13)
    local x = gridIndex - (y * 13)
    return {x = x, y = y}
end
function getGridIndexFromXY(self, coords)
    local x = coords.x - 1
    local y = coords.y - 1
    return (y * 13) + x
end
local GridValue = {}
GridValue.ROOM = 0
GridValue[GridValue.ROOM] = "ROOM"
GridValue.NULL = 1
GridValue[GridValue.NULL] = "NULL"
function ____exports.findMidBoss(self, percent)
    local startingRoomIndex = g.l:GetStartingRoomIndex()
    local rooms = g.l:GetRooms()
    local grid = {}
    do
        local i = 0
        while i < 13 do
            local row = {}
            do
                local j = 0
                while j < 13 do
                    __TS__ArrayPush(row, GridValue.NULL)
                    j = j + 1
                end
            end
            __TS__ArrayPush(grid, row)
            i = i + 1
        end
    end
    local bossRoomIndex
    do
        local i = 0
        while i < rooms.Size do
            local roomDesc = rooms:Get(i)
            local roomIndexSafe = roomDesc.SafeGridIndex
            local roomData = roomDesc.Data
            local roomType = roomData.Type
            local roomShape = roomData.Shape
            if roomType == RoomType.ROOM_BOSS then
                bossRoomIndex = roomIndexSafe
            end
            if (roomType == RoomType.ROOM_DEFAULT) or (roomType == RoomType.ROOM_BOSS) then
                local ____ = getCoordsFromGridIndex(nil, roomIndexSafe)
                local x = ____.x
                local y = ____.y
                grid[y + 1][x + 1] = GridValue.ROOM
                if (roomShape == RoomShape.ROOMSHAPE_1x2) or (roomShape == RoomShape.ROOMSHAPE_IIV) then
                    grid[(y + 1) + 1][x + 1] = GridValue.ROOM
                elseif (roomShape == RoomShape.ROOMSHAPE_2x1) or (roomShape == RoomShape.ROOMSHAPE_IIH) then
                    grid[y + 1][(x + 1) + 1] = GridValue.ROOM
                elseif roomShape == RoomShape.ROOMSHAPE_2x2 then
                    grid[y + 1][(x + 1) + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][x + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][(x + 1) + 1] = GridValue.ROOM
                elseif roomShape == RoomShape.ROOMSHAPE_LTL then
                    grid[(y + 1) + 1][x + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][x] = GridValue.ROOM
                elseif roomShape == RoomShape.ROOMSHAPE_LTR then
                    grid[(y + 1) + 1][x + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][(x + 1) + 1] = GridValue.ROOM
                elseif roomShape == RoomShape.ROOMSHAPE_LBL then
                    grid[y + 1][(x + 1) + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][(x + 1) + 1] = GridValue.ROOM
                elseif roomShape == RoomShape.ROOMSHAPE_LBR then
                    grid[y + 1][(x + 1) + 1] = GridValue.ROOM
                    grid[(y + 1) + 1][x + 1] = GridValue.ROOM
                end
                Isaac.DebugString(
                    ("Plotted room " .. tostring(i)) .. ":"
                )
                Isaac.DebugString(
                    "  ID: " .. tostring(roomData.Variant)
                )
                Isaac.DebugString(
                    "  Index: " .. tostring(roomIndexSafe)
                )
                Isaac.DebugString(
                    ((("  Coordinates: (" .. tostring(x)) .. ", ") .. tostring(y)) .. ")"
                )
                Isaac.DebugString(
                    "  Shape: " .. tostring(roomShape)
                )
            end
            i = i + 1
        end
    end
    local startingRoomCoords = getCoordsFromGridIndex(nil, startingRoomIndex)
    if bossRoomIndex == nil then
        error(
            __TS__New(Error, "Failed to find the boss room when iterating through the rooms."),
            0
        )
    end
    local bossRoomCoords = getCoordsFromGridIndex(nil, bossRoomIndex)
    Isaac.DebugString("Grid:")
    Isaac.DebugString("     1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16")
    do
        local i = 0
        while i < #grid do
            local rowString = ("  " .. tostring(i)) .. " "
            if i < 10 then
                rowString = tostring(rowString) .. " "
            end
            do
                local j = 0
                while j < #grid[i + 1] do
                    local gridValue = grid[i + 1][j + 1]
                    if gridValue == GridValue.NULL then
                        rowString = tostring(rowString) .. "  "
                    elseif gridValue == GridValue.ROOM then
                        rowString = tostring(rowString) .. tostring(gridValue)
                        if (i == startingRoomCoords.y) and (j == startingRoomCoords.x) then
                            rowString = tostring(rowString) .. "S"
                        elseif (i == bossRoomCoords.y) and (j == bossRoomCoords.x) then
                            rowString = tostring(rowString) .. "B"
                        end
                    end
                    rowString = tostring(rowString) .. " "
                    j = j + 1
                end
            end
            Isaac.DebugString(rowString)
            i = i + 1
        end
    end
    local maphandler = TiledMapHandler(grid)
    local astar = AStar(maphandler)
    startingRoomCoords.x = startingRoomCoords.x + 1
    startingRoomCoords.y = startingRoomCoords.y + 1
    bossRoomCoords.x = bossRoomCoords.x + 1
    bossRoomCoords.y = bossRoomCoords.y + 1
    Isaac.ConsoleOutput(
        ((("STARTING ROOM COORDS: (" .. tostring(startingRoomCoords.x)) .. ", ") .. tostring(startingRoomCoords.y)) .. ")"
    )
    Isaac.ConsoleOutput(
        ((("BOSS ROOM COORDS: (" .. tostring(bossRoomCoords.x)) .. ", ") .. tostring(bossRoomCoords.y)) .. ")"
    )
    local path = astar:findPath(startingRoomCoords, bossRoomCoords)
    local nodes = path:getNodes()
    Isaac.DebugString("Path:")
    do
        local i = 0
        while i < #nodes do
            local node = nodes[i + 1]
            local loc = node.location
            Isaac.DebugString(
                ((((tostring(i) .. ".  (") .. tostring(loc.x)) .. ", ") .. tostring(loc.y)) .. ")"
            )
            i = i + 1
        end
    end
    local nodeIndex = math.floor(#nodes * percent)
    nodeIndex = nodeIndex - 1
    local inBetweenNodeCoords = nodes[nodeIndex + 1].location
    return getGridIndexFromXY(nil, inBetweenNodeCoords)
end
return ____exports
end,
["callbacks.useCard"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
require("lualib_bundle");
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local misc = require("misc")
local path = require("path")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local deleteNearestHeart
function deleteNearestHeart(self)
    local hearts = Isaac.FindByType(EntityType.ENTITY_PICKUP, PickupVariant.PICKUP_HEART, HeartSubType.HEART_FULL, false, false)
    local nearestPickup = nil
    local nearestPickupDistance = nil
    for ____, heart in ipairs(hearts) do
        local pickup = heart:ToPickup()
        if ((((pickup.FrameCount <= 1) and (pickup.SpawnerType == EntityType.ENTITY_PLAYER)) and (pickup.Touched == false)) and (pickup.Price == 0)) and (pickup.State ~= 1) then
            local distanceToPlayer = g.p.Position:Distance(pickup.Position)
            if (nearestPickup == nil) or (nearestPickupDistance == nil) then
                nearestPickup = pickup
                nearestPickupDistance = distanceToPlayer
            elseif distanceToPlayer < nearestPickupDistance then
                nearestPickup = pickup
                nearestPickupDistance = distanceToPlayer
            end
        end
    end
    if nearestPickup ~= nil then
        nearestPickup.State = 1
        nearestPickup:Remove()
    end
end
function ____exports.magician(self)
    if not g.p:HasCollectible(CollectibleTypeCustom.COLLECTIBLE_TECHNOLOGY_2_5) then
        return
    end
    local lasers = Isaac.FindByType(EntityType.ENTITY_LASER, 2, -1, false, false)
    for ____, entity in ipairs(lasers) do
        if entity.SpawnerType == EntityType.ENTITY_PLAYER then
            local laser = entity:ToLaser()
            laser.TearFlags = laser.TearFlags | TearFlags.TEAR_HOMING
        end
    end
end
function ____exports.emperor(self)
    if RacingPlusGlobals.run.bossCommand then
        return
    end
    local gridIndex = path:findMidBoss(0.66)
    g.l.LeaveDoor = -1
    g.g:StartRoomTransition(gridIndex, Direction.NO_DIRECTION, 3)
    Isaac.DebugString(
        "Nerfed emperor to room. " .. tostring(gridIndex)
    )
end
function ____exports.lovers(self)
    do
        local i = 0
        while i < 2 do
            deleteNearestHeart(nil)
            i = i + 1
        end
    end
    Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_BED,
        0,
        g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true),
        g.zeroVector,
        g.p
    )
end
function ____exports.wheelOfFortune(self)
    local slotVariant
    if g.run.spawningRestock then
        g.run.spawningRestock = false
        slotVariant = 10
    else
        g.run.wheelOfFortuneRNG = misc:incrementRNG(g.run.wheelOfFortuneRNG)
        math.randomseed(g.run.wheelOfFortuneRNG)
        local slotChoice = math.random(1, 3)
        if slotChoice == 1 then
            slotVariant = 1
        elseif slotChoice == 2 then
            slotVariant = 3
        elseif slotChoice == 3 then
            slotVariant = 10
        else
            error(
                __TS__New(
                    Error,
                    "Unknown slot choice: " .. tostring(slotChoice)
                ),
                0
            )
        end
    end
    local slots = Isaac.FindByType(EntityType.ENTITY_SLOT, -1, -1, false, false)
    for ____, slot in ipairs(slots) do
        if slot.FrameCount == 0 then
            g.g:Spawn(EntityType.ENTITY_SLOT, slotVariant, slot.Position, slot.Velocity, slot.Parent, slot.SubType, slot.InitSeed)
            Isaac.Spawn(EntityType.ENTITY_EFFECT, EffectVariant.POOF01, 3, slot.Position, g.zeroVector, nil)
            slot:Remove()
        end
    end
end
function ____exports.sun(self)
    local rooms = g.l:GetRooms()
    do
        local i = 0
        while i < rooms.Size do
            local roomDesc = rooms:Get(i)
            local roomIndexSafe = roomDesc.SafeGridIndex
            local room = g.l:GetRoomByIdx(roomIndexSafe)
            room.DisplayFlags = 0
            i = i + 1
        end
    end
    local randomIndexes = {}
    repeat
        do
            local randomIndex
            repeat
                do
                    g.run.sunCardRNG = misc:incrementRNG(g.run.sunCardRNG)
                    math.randomseed(g.run.sunCardRNG)
                    randomIndex = math.random(0, rooms.Size - 1)
                end
            until not __TS__ArrayIncludes(randomIndexes, randomIndex)
            __TS__ArrayPush(randomIndexes, randomIndex)
        end
    until not (#randomIndexes < 3)
    for ____, randomIndex in ipairs(randomIndexes) do
        local roomDesc = rooms:Get(randomIndex)
        local roomIndexSafe = roomDesc.SafeGridIndex
        local room = g.l:GetRoomByIdx(roomIndexSafe)
        room.DisplayFlags = 5
    end
    g.l:UpdateVisibility()
end
function ____exports.world(self)
    local rooms = g.l:GetRooms()
    if g.l:GetStateFlag(LevelStateFlag.STATE_COMPASS_EFFECT) then
        return
    end
    do
        local i = 0
        while i < rooms.Size do
            local roomDesc = rooms:Get(i)
            local roomIndexSafe = roomDesc.SafeGridIndex
            local roomData = roomDesc.Data
            local roomType = roomData.Type
            if roomType ~= RoomType.ROOM_BOSS then
                local room = g.l:GetRoomByIdx(roomIndexSafe)
                room.DisplayFlags = 0
            end
            i = i + 1
        end
    end
    g.l:UpdateVisibility()
end
function ____exports.ansuz(self)
    local rooms = g.l:GetRooms()
    do
        local i = 0
        while i < rooms.Size do
            local roomDesc = rooms:Get(i)
            local roomIndexSafe = roomDesc.SafeGridIndex
            local room = g.l:GetRoomByIdx(roomIndexSafe)
            room.DisplayFlags = room.DisplayFlags & ~(1 << 2)
            i = i + 1
        end
    end
    g.l:UpdateVisibility()
end
return ____exports
end,
["callbacks.useItem"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local postItemPickup = require("postItemPickup")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
function ____exports.main(self)
    if not g.p:HasCollectible(CollectibleType.COLLECTIBLE_NINE_VOLT) then
        return true
    end
    g.run.nineVoltFrame = g.g:GetFrameCount()
    return true
end
function ____exports.bookOfRevelations(self)
    g.p:AddSoulHearts(-1)
    return true
end
function ____exports.theNail(self)
    g.p:AddSoulHearts(-1)
    return true
end
function ____exports.monstrosTooth(self)
    local ____obj, ____index = g.run, "monstroCounters"
    ____obj[____index] = ____obj[____index] + 1
    if g.run.monstroCounters == 3 then
        g.run.monstroCounters = 0
        g.run.monstroFrame = 0
    else
        g.run.monstroFrame = g.g:GetFrameCount() + 15
    end
    return true
end
function ____exports.bookOfSecrets(self)
    if g.l:GetStateFlag(LevelStateFlag.STATE_BLUE_MAP_EFFECT) then
        postItemPickup:blueMap()
    end
    return true
end
function ____exports.satanicBible(self)
    g.p:AddBlackHearts(-1)
    return true
end
function ____exports.brownNugget(self)
    if g.run.brownNuggetCounters == 0 then
        g.run.brownNuggetCounters = 1
        g.run.brownNuggetFrame = g.g:GetFrameCount() + 3
    end
    return true
end
function ____exports.holyPoop(self)
    Isaac.GridSpawn(GridEntityType.GRID_POOP, 6, g.p.Position, false)
    g.sfx:Play(SoundEffect.SOUND_FART, 1, 0, false, 1)
    return true
end
function ____exports.momsBraImproved(self)
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_MOMS_BRA, true, false, false, false)
    return true
end
function ____exports.monsterManualImproved(self)
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_MONSTER_MANUAL, true, false, false, false)
    return true
end
function ____exports.boxOfSpidersImproved(self)
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_BOX_OF_SPIDERS, true, false, false, false)
    return true
end
function ____exports.megaBlastSingle(self)
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_MEGA_SATANS_BREATH, true, false, false, false)
    g.p:RemoveCollectible(CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE)
    return true
end
function ____exports.clockworkAssembly(self)
    g.run.spawningRestock = true
    RacingPlusGlobals.run.streakIgnore = true
    g.p:UseCard(Card.CARD_WHEEL_OF_FORTUNE)
    return true
end
function ____exports.chargingStation(self)
    if RacingPlusSchoolbag:IsItemFullyCharged() then
        return false
    end
    local coins = g.p:GetNumCoins()
    if coins == 0 then
        return false
    end
    g.p:AddCoins(-1)
    RacingPlusSchoolbag:AddCharge(true)
    g.p:AnimateCollectible(CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION, "UseItem", "PlayerPickup")
    g.sfx:Play(SoundEffect.SOUND_BEEP, 1, 0, false, 1)
    return true
end
return ____exports
end,
["callbacks.usePill"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local ____globals = require("globals")
local g = ____globals.default
local pills = require("pills")
local postNewRoom = require("callbacks.postNewRoom")
local animateUse
function animateUse(self, thisPillEffect)
    local thisPillColor
    g.run.pills.effects:forEach(
        function(____, pillEffect, pillColor)
            if pillEffect == thisPillEffect then
                thisPillColor = pillColor
            end
        end
    )
    if thisPillColor == nil then
        thisPillColor = PillColor.PILL_BLUE_BLUE
    end
    g.p:AnimatePill(thisPillColor, "UseItem")
    local pillName = g.itemConfig:GetPillEffect(thisPillEffect).Name
    RacingPlusGlobals.run.streakText = pillName
end
function ____exports.damageUp(self)
    local damageAmount = 2
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        damageAmount = damageAmount * 2
    end
    local ____obj, ____index = g.run.pills, "damageUp"
    ____obj[____index] = ____obj[____index] + damageAmount
    g.p:AddCacheFlags(CacheFlag.CACHE_DAMAGE)
    g.p:EvaluateItems()
    pills:animateHappy()
end
function ____exports.tearDelayDown(self)
    local delayAmount = 1
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        delayAmount = 2
    end
    local ____obj, ____index = g.run.pills, "tearDelayDown"
    ____obj[____index] = ____obj[____index] + delayAmount
    g.p:AddCacheFlags(CacheFlag.CACHE_FIREDELAY)
    g.p:EvaluateItems()
    pills:animateHappy()
end
function ____exports.dealAffinity(self)
    local stage = g.l:GetStage()
    if (stage == 1) or (stage == 2) then
        pills:animateHappy()
        return
    end
    local lastDevilStage = RacingPlusGlobals.run.lastDDLevel
    local levelModifier = 1
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        levelModifier = 2
    end
    local newLastDevilStage = lastDevilStage - levelModifier
    if newLastDevilStage < 0 then
        newLastDevilStage = 0
    end
    g.g:SetLastDevilRoomStage(newLastDevilStage)
    pills:animateHappy()
end
function ____exports.boneAffinity(self, pillEffect)
    local numBones = 10
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        numBones = numBones * 2
    end
    do
        local i = 0
        while i < numBones do
            Isaac.Spawn(EntityType.ENTITY_FAMILIAR, FamiliarVariant.BONE_ORBITAL, 0, g.p.Position, g.zeroVector, g.p)
            i = i + 1
        end
    end
    animateUse(nil, pillEffect)
end
function ____exports.restock(self, pillEffect)
    g.run.spawningRestock = true
    g.p:UseCard(Card.CARD_WHEEL_OF_FORTUNE)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        g.run.spawningRestock = true
        g.p:UseCard(Card.CARD_WHEEL_OF_FORTUNE)
    end
    animateUse(nil, pillEffect)
end
function ____exports.goldenDump(self, pillEffect)
    local position = g.p.Position
    Isaac.GridSpawn(GridEntityType.GRID_POOP, 3, position, false)
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        position = g.r:FindFreePickupSpawnPosition(g.p.Position, 1, true)
        Isaac.GridSpawn(GridEntityType.GRID_POOP, 3, position, false)
    end
    g.sfx:Play(SoundEffect.SOUND_FART, 1, 0, false, 1)
    g.r:TurnGold()
    animateUse(nil, pillEffect)
end
function ____exports.glimpse(self, pillEffect)
    g.l:ApplyCompassEffect(false)
    animateUse(nil, pillEffect)
end
function ____exports.superSadness(self)
    g.run.pills.superSadness = g.g:GetFrameCount() + pills:getDuration()
    g.p:AddCacheFlags(CacheFlag.CACHE_FIREDELAY)
    g.p:EvaluateItems()
    pills:animateHappy()
end
function ____exports.invincibility(self)
    g.run.pills.invincibility = g.g:GetFrameCount() + pills:getDuration()
    g.p:AddNullCostume(NullItemID.ID_STATUE)
    pills:animateHappy()
end
function ____exports.reallyBadGas(self, pillEffect)
    g.run.pills.reallyBadGas = g.g:GetFrameCount() + pills:getDuration()
    animateUse(nil, pillEffect)
end
function ____exports.aether(self)
    g.run.pills.wallsHaveEyes = g.g:GetFrameCount() + pills:getDuration()
    pills:animateHappy()
end
function ____exports.wallsHaveEyes(self)
    g.run.pills.wallsHaveEyes = g.g:GetFrameCount() + pills:getDuration()
    pills:animateHappy()
end
function ____exports.bladderInfection(self, pillEffect)
    g.run.pills.bladderInfection = g.g:GetFrameCount() + pills:getDuration()
    animateUse(nil, pillEffect)
end
function ____exports.scorchedEarth(self, pillEffect)
    local numFires = 80
    if g.p:HasCollectible(CollectibleType.COLLECTIBLE_PHD) then
        numFires = numFires * 2
    end
    g.run.pills.scorchedEarth = numFires
    animateUse(nil, pillEffect)
end
function ____exports.familiarFrenzy(self, pillEffect)
    g.run.pills.familiarFrenzy = g.g:GetFrameCount() + pills:getDuration()
    postNewRoom:familiarFrenzy()
    animateUse(nil, pillEffect)
end
function ____exports.unlock(self)
    g.p:UseActiveItem(CollectibleType.COLLECTIBLE_DADS_KEY, true, false, false, false)
end
return ____exports
end,
["main"] = function() --[[ Generated with https://github.com/TypeScriptToLua/TypeScriptToLua ]]
local ____exports = {}
local entityTakeDmg = require("callbacks.entityTakeDmg")
local evaluateCache = require("callbacks.evaluateCache")
local executeCmd = require("callbacks.executeCmd")
local familiarInit = require("callbacks.familiarInit")
local familiarUpdate = require("callbacks.familiarUpdate")
local getCard = require("callbacks.getCard")
local getPillColor = require("callbacks.getPillColor")
local getPillEffect = require("callbacks.getPillEffect")
local NPCUpdate = require("callbacks.NPCUpdate")
local postBombUpdate = require("callbacks.postBombUpdate")
local postEffectUpdate = require("callbacks.postEffectUpdate")
local postFireTear = require("callbacks.postFireTear")
local postGameStarted = require("callbacks.postGameStarted")
local postKnifeUpdate = require("callbacks.postKnifeUpdate")
local postLaserInit = require("callbacks.postLaserInit")
local postLaserUpdate = require("callbacks.postLaserUpdate")
local postNewLevel = require("callbacks.postNewLevel")
local postNewRoom = require("callbacks.postNewRoom")
local postPickupInit = require("callbacks.postPickupInit")
local postPickupRender = require("callbacks.postPickupRender")
local postPickupUpdate = require("callbacks.postPickupUpdate")
local postPlayerInit = require("callbacks.postPlayerInit")
local postProjectileUpdate = require("callbacks.postProjectileUpdate")
local postRender = require("callbacks.postRender")
local postTearUpdate = require("callbacks.postTearUpdate")
local postUpdate = require("callbacks.postUpdate")
local preEntitySpawn = require("callbacks.preEntitySpawn")
local preFamiliarCollision = require("callbacks.preFamiliarCollision")
local preProjectileCollision = require("callbacks.preProjectileCollision")
local preTearCollision = require("callbacks.preTearCollision")
local preUseItem = require("callbacks.preUseItem")
local useCard = require("callbacks.useCard")
local useItem = require("callbacks.useItem")
local usePill = require("callbacks.usePill")
local ____constants = require("constants")
local VERSION = ____constants.VERSION
local catalog = require("items.catalog")
local ____enums_2Ecustom = require("types.enums.custom")
local CollectibleTypeCustom = ____enums_2Ecustom.CollectibleTypeCustom
local EffectVariantCustom = ____enums_2Ecustom.EffectVariantCustom
local PillEffectCustom = ____enums_2Ecustom.PillEffectCustom
error = function(____, err)
    if err == 0 then
        return
    end
    Isaac.DebugString(
        "Custom error function: " .. tostring(err)
    )
    Isaac.DebugString(
        debug.traceback()
    )
end
local RPRebalanced = RegisterMod("Racing+ Rebalanced", 1)
RacingPlusRebalancedVersion = VERSION
RPRebalanced:AddCallback(ModCallbacks.MC_NPC_UPDATE, NPCUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_RENDER, postRender.main)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PLAYER_INIT, postPlayerInit.main)
RPRebalanced:AddCallback(ModCallbacks.MC_ENTITY_TAKE_DMG, entityTakeDmg.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom.main)
RPRebalanced:AddCallback(ModCallbacks.MC_GET_CARD, getCard.main)
RPRebalanced:AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd.main)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_ENTITY_SPAWN, preEntitySpawn.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_TEAR_UPDATE, postTearUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_TEAR_COLLISION, preTearCollision.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PROJECTILE_UPDATE, postProjectileUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_PROJECTILE_COLLISION, preProjectileCollision.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_LASER_INIT, postLaserInit.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_LASER_UPDATE, postLaserUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_KNIFE_UPDATE, postKnifeUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_BOMB_UPDATE, postBombUpdate.main)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_FIRE_TEAR, postFireTear.main)
RPRebalanced:AddCallback(ModCallbacks.MC_GET_PILL_COLOR, getPillColor.main)
RPRebalanced:AddCallback(ModCallbacks.MC_GET_PILL_EFFECT, getPillEffect.main)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.bookOfRevelations, 999)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.theNail, CollectibleType.COLLECTIBLE_THE_NAIL)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.monstrosTooth, CollectibleType.COLLECTIBLE_MONSTROS_TOOTH)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.bookOfSecrets, CollectibleType.COLLECTIBLE_BOOK_OF_SECRETS)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.satanicBible, CollectibleType.COLLECTIBLE_SATANIC_BIBLE)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.brownNugget, CollectibleType.COLLECTIBLE_BROWN_NUGGET)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.holyPoop, CollectibleTypeCustom.COLLECTIBLE_HOLY_POOP)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.momsBraImproved, CollectibleTypeCustom.COLLECTIBLE_MOMS_BRA_IMPROVED)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.monsterManualImproved, CollectibleTypeCustom.COLLECTIBLE_MONSTER_MANUAL_IMPROVED)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.boxOfSpidersImproved, CollectibleTypeCustom.COLLECTIBLE_BOX_OF_SPIDERS_IMPROVED)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.megaBlastSingle, CollectibleTypeCustom.COLLECTIBLE_MEGA_BLAST_SINGLE)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.clockworkAssembly, CollectibleTypeCustom.COLLECTIBLE_CLOCKWORK_ASSEMBLY)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, useItem.chargingStation, CollectibleTypeCustom.COLLECTIBLE_CHARGING_STATION)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_ITEM, catalog.useItem, CollectibleTypeCustom.COLLECTIBLE_CATALOG)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.magician, Card.CARD_MAGICIAN)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.emperor, Card.CARD_EMPEROR)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.lovers, Card.CARD_LOVERS)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.wheelOfFortune, Card.CARD_WHEEL_OF_FORTUNE)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.sun, Card.CARD_SUN)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.world, Card.CARD_WORLD)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_CARD, useCard.ansuz, Card.RUNE_ANSUZ)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, familiarUpdate.leech, FamiliarVariant.LEECH)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, familiarUpdate.yoListen, FamiliarVariant.YO_LISTEN)
local preventStackingFamiliarVariants = {FamiliarVariant.LITTLE_CHUBBY, FamiliarVariant.DEAD_BIRD, FamiliarVariant.EVES_BIRD_FOOT, FamiliarVariant.LEECH, FamiliarVariant.LIL_HAUNT, FamiliarVariant.SISSY_LONGLEGS, FamiliarVariant.LIL_GURDY, FamiliarVariant.BIG_CHUBBY}
for ____, familiarVariant in ipairs(preventStackingFamiliarVariants) do
    RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, familiarUpdate.preventStacking, familiarVariant)
end
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.littleChubby, FamiliarVariant.LITTLE_CHUBBY)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.deadBird, FamiliarVariant.DEAD_BIRD)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.deadBird, FamiliarVariant.EVES_BIRD_FOOT)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.daddyLonglegs, FamiliarVariant.DADDY_LONGLEGS)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.sacrificialDagger, FamiliarVariant.SACRIFICIAL_DAGGER)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.leech, FamiliarVariant.LEECH)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.lilHaunt, FamiliarVariant.LIL_HAUNT)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.blueBabysOnlyFriend, FamiliarVariant.BLUEBABYS_ONLY_FRIEND)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.gemini, FamiliarVariant.GEMINI)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.lilGurdy, FamiliarVariant.LIL_GURDY)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.bumbo, FamiliarVariant.BUMBO)
RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.bigChubby, FamiliarVariant.BIG_CHUBBY)
local disableVanillaShootingFamiliarVariants = {FamiliarVariant.BROTHER_BOBBY, FamiliarVariant.LITTLE_GISH, FamiliarVariant.LITTLE_STEVEN, FamiliarVariant.ROBO_BABY, FamiliarVariant.SISTER_MAGGY, FamiliarVariant.GHOST_BABY, FamiliarVariant.HARLEQUIN_BABY, FamiliarVariant.RAINBOW_BABY, FamiliarVariant.ISAACS_HEAD, FamiliarVariant.MONGO_BABY, FamiliarVariant.SERAPHIM, FamiliarVariant.LIL_LOKI}
for ____, familiarVariant in ipairs(disableVanillaShootingFamiliarVariants) do
    RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.disableVanillaShooting, familiarVariant)
end
local damage7FamiliarVariants = {FamiliarVariant.FOREVER_ALONE, FamiliarVariant.DISTANT_ADMIRATION, FamiliarVariant.FRIEND_ZONE}
for ____, familiarVariant in ipairs(damage7FamiliarVariants) do
    RPRebalanced:AddCallback(ModCallbacks.MC_FAMILIAR_INIT, familiarInit.damage7, familiarVariant)
end
RPRebalanced:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.damage, CacheFlag.CACHE_DAMAGE)
RPRebalanced:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.fireDelay, CacheFlag.CACHE_FIREDELAY)
RPRebalanced:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.shotSpeed, CacheFlag.CACHE_SHOTSPEED)
RPRebalanced:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.speed, CacheFlag.CACHE_SPEED)
RPRebalanced:AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache.luck, CacheFlag.CACHE_LUCK)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.damageUp, PillEffectCustom.PILLEFFECT_DAMAGE_UP)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.tearDelayDown, PillEffectCustom.PILLEFFECT_TEAR_DELAY_DOWN)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.dealAffinity, PillEffectCustom.PILLEFFECT_DEAL_AFFINITY)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.boneAffinity, PillEffectCustom.PILLEFFECT_BONE_AFFINITY)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.restock, PillEffectCustom.PILLEFFECT_RESTOCK)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.goldenDump, PillEffectCustom.PILLEFFECT_GOLDEN_DUMP)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.glimpse, PillEffectCustom.PILLEFFECT_GLIMPSE)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.superSadness, PillEffectCustom.PILLEFFECT_SUPER_SADNESS)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.invincibility, PillEffectCustom.PILLEFFECT_INVINCIBILITY)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.reallyBadGas, PillEffectCustom.PILLEFFECT_REALLY_BAD_GAS)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.aether, PillEffectCustom.PILLEFFECT_AETHER)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.wallsHaveEyes, PillEffectCustom.PILLEFFECT_WALLS_HAVE_EYES)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.bladderInfection, PillEffectCustom.PILLEFFECT_BLADDER_INFECTION)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.scorchedEarth, PillEffectCustom.PILLEFFECT_SCORCHED_EARTH)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.familiarFrenzy, PillEffectCustom.PILLEFFECT_FAMILIAR_FRENZY)
RPRebalanced:AddCallback(ModCallbacks.MC_USE_PILL, usePill.unlock, PillEffectCustom.PILLEFFECT_UNLOCK)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_USE_ITEM, preUseItem.isaacsTears, CollectibleType.COLLECTIBLE_ISAACS_TEARS)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_USE_ITEM, preUseItem.voidItem, CollectibleType.COLLECTIBLE_VOID)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_USE_ITEM, catalog.preUseItem, CollectibleTypeCustom.COLLECTIBLE_CATALOG)
RPRebalanced:AddCallback(ModCallbacks.MC_PRE_FAMILIAR_COLLISION, preFamiliarCollision.momsRazor, FamiliarVariant.MOMS_RAZOR)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PICKUP_INIT, postPickupInit.tarotCard, PickupVariant.PICKUP_TAROTCARD)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate.heart, PickupVariant.PICKUP_HEART)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate.collectible, PickupVariant.PICKUP_COLLECTIBLE)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_PICKUP_RENDER, postPickupRender.collectible, PickupVariant.PICKUP_COLLECTIBLE)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate.blueFlame, EffectVariant.BLUE_FLAME)
RPRebalanced:AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate.diceRoomCustom, EffectVariantCustom.DICE_ROOM_FLOOR_CUSTOM)
local playerCreepEffectVariants = {EffectVariant.PLAYER_CREEP_LEMON_MISHAP, EffectVariant.PLAYER_CREEP_HOLYWATER, EffectVariant.PLAYER_CREEP_RED, EffectVariant.PLAYER_CREEP_GREEN, EffectVariant.PLAYER_CREEP_HOLYWATER_TRAIL, EffectVariant.PLAYER_CREEP_LEMON_PARTY}
for ____, effectVariant in ipairs(playerCreepEffectVariants) do
    RPRebalanced:AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate.creepScaling, effectVariant)
end
local modName = "Racing+ Rebalanced"
local welcomeText = ((tostring(modName) .. " ") .. tostring(VERSION)) .. " initialized."
local hyphens = string.rep(
    "-",
    math.floor(#welcomeText)
)
local welcomeTextBorder = ("+-" .. tostring(hyphens)) .. "-+"
Isaac.DebugString(welcomeTextBorder)
Isaac.DebugString(
    ("| " .. tostring(welcomeText)) .. " |"
)
Isaac.DebugString(welcomeTextBorder)
return ____exports
end,
}
return require("main")
