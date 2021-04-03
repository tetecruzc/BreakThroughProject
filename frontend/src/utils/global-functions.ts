
export function keySort (keys : any, object: any) : any{
  
      keys = keys || {};
    
   
      var obLen = function(obj : any) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key))
                  size++;
          }
          return size;
      };
  

      var obIx = function(obj : any, ix: any) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                  if (size == ix)
                      return key;
                  size++;
              }
          }
          return false;
      };
  
      var keySort = function(a : any, b: any, d: any) {
          d = d !== null ? d : 1;
          // a = a.toLowerCase(); // this breaks numbers
          // b = b.toLowerCase();
          if (a == b)
              return 0;
          return a > b ? 1 * d : -1 * d;
      };
  
      var KL = obLen(keys);
  
      if (!KL) return object.sort(keySort);
  
      for ( var k in keys) {
          // asc unless desc or skip
          keys[k] = 
                  keys[k] == 'desc' || keys[k] == -1  ? -1 
                : (keys[k] == 'skip' || keys[k] === 0 ? 0 
                : 1);
      }
  
      object.sort(function(a: any, b: any) {
          var sorted = 0, ix = 0;
  
          while (sorted === 0 && ix < KL) {
              var k = obIx(keys, ix);
              if (k) {
                  var dir = keys[k];
                  sorted = keySort(a[k], b[k], dir);
                  ix++;
              }
          }
          return sorted;
      });
      return object;
  };
  