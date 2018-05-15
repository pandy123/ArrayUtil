export class TypesArray {
   /**数值 */
   private _values: Array<any>;
   /**[索引，值]迭代器 */
   private _iteratorIndex: number;
   /**索引迭代器 */
   private _iteratorKeyIdex: number;

   /**
    * 构造函数
    */
   constructor() {
      this._values = new Array<any>();
      this._iteratorIndex = 0;
      this._iteratorKeyIdex = 0;
   }

   /**
    * 判断是否是数组类型
    * @param arr 
    */
   public static isArray(arr: any) {
      return Array.isArray(arr);
   }

   /**
    * 获取长度
    */
   public get length() {
      return this._values.length;
   }

   /**获取 */
   public get(index: number): any {
      return this._values[index];
   }

   /**
    * 添加一个元素，修改数据表 
    */
   public push(value: any): TypesArray {
      this._values[this.length] = value;
      return this;
   }

   /**
    * 
    * @param target  0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，
                     将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
    * @param start   0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
    * @param end     0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
    */
   public copyWithin(target: number, start: number = 0, end: number = this.length - 1): TypesArray {
      var begin = Math.max(start, 0);
      var terminal = Math.min(end, this.length - 1);
      if (target < 0 || target > this.length - 1) {
         return this;
      }
      for (var i = 0; i < terminal - begin + 1; i++) {
         if (target + i < this.length) {
            this._values[target + i] = this._values[begin + i];
         } else {
            return this;
         }
      }
      return this;
   }

   /**
    * 每一个元素的循环处理 The forEach() method executes a provided function once for each array element.
    * @param process(item,index,array)
    */
   public forEach(process: Function) {
      for (var i = 0; i < this.length; i++) {
         process(this.get(i), i, this);
      }
   }

   /**
    * @ 返回一个iterator
    * @returns 一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
    */
   public entries(): any {
      this._iteratorIndex = 0;
      var self = this;
      return {
         next: function () {
            var nextIndex = self._iteratorIndex;
            var length = self.length;
            if (nextIndex < length) {
               self._iteratorIndex++;
               return { value: [nextIndex, self.get(nextIndex)], done: false };
            } else {
               return { value: undefined, done: true };
            }
         },
         init: function () {
            self._iteratorIndex = 0;
         }
      }
   }

   /**
    * The map() method creates a new array with the results of calling a provided function on every element in the calling array.
    * 返回一个新数组
    * @param process  返回值是一个新元素 (value,index,array)
    */
   public map(process: Function): TypesArray {
      var newarray = new TypesArray();
      for (var i = 0; i < this.length; i++) {
         var newitem = process(this.get(i), i, this);
         newarray.push(newitem);
      }
      return newarray;
   }


   /**
    *    pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
    */
   public pop() {
      if (this.length > 0) {
         delete this._values[this.length - 1];
         this._values.length = this.length - 1;
      }
      return null;
   }

   /**
    * 返回索引，或-1
    */
   public indexof(value: any): number {
      for (var i = 0; i < this.length; i++) {
         if (this.get(i) == value) {
            return i;
         }
      }
      return -1;
   }

   /**
    * 合并字符串
    * @param seperator 
    */
   public join(seperator: string): string {
      var str: string = '';
      for (var i = 0; i < this.length; i++) {
         str.concat(this.get(i).toString());
         if (i > 0) {
            str.concat(seperator);
         }
      }
      return str;
   }

   /**
    * 返回一个索引的iterator
    */
   public keys(): any {
      this._iteratorKeyIdex = 0;
      var self = this;
      return {
         next: function () {
            if (self._iteratorKeyIdex < self.length) {
               return { value: self._iteratorKeyIdex, done: false }
            } else {
               return { value: null, done: true }
            }
         },
         init: function () {
            self._iteratorKeyIdex = 0;
         }
      }
   }

   /**
    * 返回值的iterator
    */
   public values(): any {
      this._iteratorKeyIdex = 0;
      var self = this;
      return {
         next: function () {
            if (self._iteratorKeyIdex < self.length) {
               return { value: this.get(self._iteratorKeyIdex), done: false }
            } else {
               return { value: null, done: true }
            }
         },
         init: function () {
            self._iteratorKeyIdex = 0;
         }
      }
   }

   /**
    * lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
    * @param value 
    */
   public lastIndexOf(value: any): number {
      for (var i = this.length - 1; i > 0; i--) {
         if (this.get(i) == value) {
            return i;
         }
      }
      return -1;
   }

   /**
    * 
    * @param process(accumulator上一次回调返回值，accumulator当前处理值，accumulator当前处理值的索引，array当前数组) 
    * @param initialValue initialValue可选用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
    */
   public reduce(process: Function, initialValue: any) {
      if (initialValue != null) {
         var accumulator = initialValue;
      } else {
         var accumulator = this.get(0);
      }
      for (var i = 0; i < this.length; i++) {
         process(accumulator, this.get(i), i, this._values)
      }
      return accumulator;
   }

   /**
    * 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
    */
   public reduceRight(process: Function, initialValue: any) {
      if (initialValue != null) {
         var accumulator = initialValue;
      } else {
         var accumulator = this.get(this.length - 1);
      }
      for (var i = 0; i < this.length; i++) {
         process(accumulator, this.get(i), i, this._values)
      }
      return accumulator;
   }

   /**
    * 将数组中位置颠倒
    */
   public reverse() {
      var array = new TypesArray();
      for (var i = this.length - 1; i > 0; i++) {
         array.push(this.get(i));
      }
      this._values = array._values;
      return array;
   }

   /**
    * 从数组中删除第一个元素
    */
   public shift() {
      if (this.length == 1) {
         this.pop();
      } else if (this.length > 1) {
         for (var i = 1; i < this.length; i++) {
            this._values[i - 1] = this._values[i];
         }
         this.pop();
      }
   }

   /**
    * 分片，浅拷贝一个数组对象
    */
   public slice(start: number = 0, end: number = this.length - 1) {
      var array = new TypesArray();
      for (var i = start; i <= end; i++) {
         array.push(this.get(i));
      }
      return array;
   }

   /**
    * 个别元素通过测试即为测试通过
    * @param test（element，index，array） return boolean  返回当前元素是否通过测试 
    */
   public some(test: Function): boolean {
      for (var i = 0; i < this.length; i++) {
         if (test(this.get(i))) {
            return true;
         }
      }
      return false;
   }

   /**
    * 排序，排序算法用默认的
    */
   public sort() {
      this._values.sort();
   }

   /**
    * 删除和插入字符串数据
    */
   public splice(start: number, count: number, ...args: Array<any>) {
      // 如果args 为插入字，count是删除
      var i = 0;
      if (count > 0) {
         do {
            this._values[start + i] = this._values[start + count + i];
            i++;
         } while (i < count)
      }
      this._values.length = this.length - count;
      var num = args.length;
      if (num > 0) {
         for (var i = this._values.length - 1; i > start; i--) {
            this._values[i + num] = this._values[i];
         }
         for (var i = 1; i <= num; i++) {
            this._values[start + i] = args[i - 1];
         }
      }
   }

   /**
    * 数组头部插入
    * @param args 
    */
   public unshift(...args: Array<any>) {
      var num = args.length;
      if (num > 0) {
         for (var i = this._values.length - 1; i >= 0; i--) {
            this._values[i + num] = this._values[i];
         }
         for (var i = 0; i <= num; i++) {
            this._values[i] = args[i];
         }
      }
   }

   /**
    * 从索引处开始寻找value，是否在数组内
    * @param value 
    * @param startIndex 
    */
   public includes(value: any, startIndex: number = 0): boolean {
      var start = Math.max(0, startIndex);
      for (var i = start; i < this.length; i++) {
         if (this.get(i) == value) {
            return true;
         }
      }
      return false;
   }

   /**
    * The flatten() method creates a new array with all sub-array elements concatted into it recursively up to the specified depth.
    * 返回一个新数组，把子数组的元素展入到父级数组
    */
   public flatten(depth: number = 1): TypesArray {
      var newarray = new TypesArray();
      for (var i = 0; i < this.length; i++) {
         if (this.get(i) instanceof TypesArray) {
            if (depth > 0) {
               var subarray = this.get(i).flatten(depth - 1);
               for (var j = 0; i < subarray.length; i++) {
                  newarray.push(subarray.get(j));
               }
            }
         } else {
            newarray.push(this.get(i));
         }
      }
      return newarray;
   }

   /**
    * 填充数据,修改数据表
    * @param value 
    * @param startIndex 
    * @param endIndex 
    */
   public fill(value: number, startIndex: number = 0, endIndex: number = this.length - 1): TypesArray {
      if (startIndex < 0 || startIndex > this.length - 1) {
         return this;
      }
      if (endIndex < startIndex || endIndex > this.length - 1) {
         return this;
      }
      for (var i = startIndex; i < endIndex; i++) {
         this._values[i] = value;
      }
      return this;
   }

   /**
    * this method is to merge two or more arrays, this method does not change the exist arrays, but instead 
    * returns a new array，不修改数据表,返回一个新数组
    * @param array 
    */
   public concat(array: TypesArray): TypesArray {
      var newarray = new TypesArray();
      for (var i = 0; i < this.length; i++) {
         newarray.push(this.get(i));
      }
      for (var i = 0; i < array.length; i++) {
         newarray.push(array.get(i));
      }
      return newarray;
   }

   /**
    * 返回满足filter条件的一个新数组
    * @param filter 返回值是true 或 false
    */
   public filter(filter: Function): TypesArray {
      var newarray = new TypesArray();
      for (var i = 0; i < this.length; i++) {
         if (filter(this.get(i))) {
            newarray.push(this.get(i));
         }
      }
      return newarray;
   }

   /**
    * 返回满足filter条件的第一个元素
    * @param filter 返回值是true 或 false
    */
   public find(filter: Function): any {
      for (var i = 0; i < this.length; i++) {
         if (filter(this.get(i))) {
            return this.get(i);
         }
      }
   }

   /**
    * 返回满足filter条件的第一个元素的索引
    * @param filter 返回值是true 或 false
    */
   public findIndex(filter: Function): any {
      for (var i = 0; i < this.length; i++) {
         if (filter(this.get(i))) {
            return i;
         }
      }
   }

   /**
    * The every() method tests whether all elements in the array pass the test implemented by the provided function.
    *所有元素通过阈值才返回true 
    * @param threshhold 返回值也是逻辑true 或 false
    */
   public every(threshhold: Function): boolean {
      for (var i = 0; i < this.length; i++) {
         if (!threshhold(this.get(i))) {
            /**有一个返回假，则返回假 */
            return false;
         }
      }
      return true;
   }

   /**
    * 释放内存函数
    */
   public dispose() {
      var count = this._values.length;
      for (var i = 0; i < count; i++) {
         if ((this._values[i] as any).dispose) {
            (this._values[i] as any).dispose();
         }
      }
      this._values = null as any;
   }
}