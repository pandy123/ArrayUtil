export declare class TypesArray {
    /**数值 */
    private _values;
    /**[索引，值]迭代器 */
    private _iteratorIndex;
    /**索引迭代器 */
    private _iteratorKeyIdex;
    /**
     * 构造函数
     */
    constructor();
    /**
     * 判断是否是数组类型
     * @param arr
     */
    static isArray(arr: any): boolean;
    /**
     * 获取长度
     */
    readonly length: number;
    /**获取 */
    get(index: number): any;
    /**
     * 添加一个元素，修改数据表
     */
    push(value: any): TypesArray;
    /**
     *
     * @param target  0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，
                      将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
     * @param start   0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
     * @param end     0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
     */
    copyWithin(target: number, start?: number, end?: number): TypesArray;
    /**
     * 每一个元素的循环处理 The forEach() method executes a provided function once for each array element.
     * @param process(item,index,array)
     */
    forEach(process: Function): void;
    /**
     * @ 返回一个iterator
     * @returns 一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
     */
    entries(): any;
    /**
     * The map() method creates a new array with the results of calling a provided function on every element in the calling array.
     * 返回一个新数组
     * @param process  返回值是一个新元素 (value,index,array)
     */
    map(process: Function): TypesArray;
    /**
     *    pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
     */
    pop(): null;
    /**
     * 返回索引，或-1
     */
    indexof(value: any): number;
    /**
     * 合并字符串
     * @param seperator
     */
    join(seperator: string): string;
    /**
     * 返回一个索引的iterator
     */
    keys(): any;
    /**
     * 返回值的iterator
     */
    values(): any;
    /**
     * lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
     * @param value
     */
    lastIndexOf(value: any): number;
    /**
     *
     * @param process(accumulator上一次回调返回值，accumulator当前处理值，accumulator当前处理值的索引，array当前数组)
     * @param initialValue initialValue可选用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
     */
    reduce(process: Function, initialValue: any): any;
    /**
     * 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
     */
    reduceRight(process: Function, initialValue: any): any;
    /**
     * 将数组中位置颠倒
     */
    reverse(): TypesArray;
    /**
     * 从数组中删除第一个元素
     */
    shift(): void;
    /**
     * 分片，浅拷贝一个数组对象
     */
    slice(start?: number, end?: number): TypesArray;
    /**
     * 个别元素通过测试即为测试通过
     * @param test（element，index，array） return boolean  返回当前元素是否通过测试
     */
    some(test: Function): boolean;
    /**
     * 排序，排序算法用默认的
     */
    sort(): void;
    /**
     * 删除和插入字符串数据
     */
    splice(start: number, count: number, ...args: Array<any>): void;
    /**
     * 数组头部插入
     * @param args
     */
    unshift(...args: Array<any>): void;
    /**
     * 从索引处开始寻找value，是否在数组内
     * @param value
     * @param startIndex
     */
    includes(value: any, startIndex?: number): boolean;
    /**
     * The flatten() method creates a new array with all sub-array elements concatted into it recursively up to the specified depth.
     * 返回一个新数组，把子数组的元素展入到父级数组
     */
    flatten(depth?: number): TypesArray;
    /**
     * 填充数据,修改数据表
     * @param value
     * @param startIndex
     * @param endIndex
     */
    fill(value: number, startIndex?: number, endIndex?: number): TypesArray;
    /**
     * this method is to merge two or more arrays, this method does not change the exist arrays, but instead
     * returns a new array，不修改数据表,返回一个新数组
     * @param array
     */
    concat(array: TypesArray): TypesArray;
    /**
     * 返回满足filter条件的一个新数组
     * @param filter 返回值是true 或 false
     */
    filter(filter: Function): TypesArray;
    /**
     * 返回满足filter条件的第一个元素
     * @param filter 返回值是true 或 false
     */
    find(filter: Function): any;
    /**
     * 返回满足filter条件的第一个元素的索引
     * @param filter 返回值是true 或 false
     */
    findIndex(filter: Function): any;
    /**
     * The every() method tests whether all elements in the array pass the test implemented by the provided function.
     *所有元素通过阈值才返回true
     * @param threshhold 返回值也是逻辑true 或 false
     */
    every(threshhold: Function): boolean;
    /**
     * 释放内存函数
     */
    dispose(): void;
}
