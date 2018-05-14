export class TypeArray {
   /**数值 */
   private _values: Array<any>;
   /**个数 */
   private _count: number;
   /**内部迭代器 */
   private _iteratorIndex: number;

   /**
    * 构造函数
    */
   constructor() {
      this._values = new Array<any>();
      this._count = 0;
      this._iteratorIndex = 0;
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
   public push(value: any): TypeArray {
      this._values[this._count] = value;
      this._count++;
      return this;
   }

   /**
    * 
    * @param target  0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。如果 target 大于等于 arr.length，
                     将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
    * @param start   0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。如果 start 被忽略，copyWithin 将会从0开始复制。
    * @param end     0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。
    */
   public copyWithin(target: number, start: number = 0, end: number = this.length - 1): TypeArray {
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
    * @
    * @returns 一个新的 Array 迭代器对象。Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，可用用于遍历迭代器取得原数组的[key,value]。
    */
   public entries() {
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
   public map(process: Function): TypeArray {
      var newarray = new TypeArray();
      for (var i = 0; i < this.length; i++) {
         var newitem = process(this.get(i), i, this);
         newarray.push(newitem);
      }
      return newarray;
   }

   /**
    * The flatten() method creates a new array with all sub-array elements concatted into it recursively up to the specified depth.
    * 返回一个新数组，把子数组的元素展入到父级数组
    */
   public flatten(depth: number = 1): TypeArray {
      var newarray = new TypeArray();
      for (var i = 0; i < this.length; i++) {
         if (this.get(i) instanceof TypeArray) {
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
   public fill(value: number, startIndex: number = 0, endIndex: number = this.length - 1): TypeArray {
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
   public concat(array: TypeArray): TypeArray {
      var newarray = new TypeArray();
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
   public filter(filter: Function): TypeArray {
      var newarray = new TypeArray();
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