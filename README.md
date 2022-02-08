# Firebase + NextJS search example :fire:

This is an example showing how to solve the problem of multiple querying in firebase. 

# Problem
Let's assume that you want to find **Audi TT** in your cars collection. Unfortunately the below code gives an error since firebase still doesn't support multiple querying at once.
```
db.collection('cars')
  .where('tags', 'array-contains', 'audi')
  .where('tags', 'array-contains', 'tt')
 ```
 This option is also incorrect because it'll give you all **Audi** cars. 
 ```
 db.collection('jobs')
  .where('tags', 'array-contains-any', ['audi', 'tt'])
  ```
 If you want to query documents that contain all searched keywords, then you have to sort it out in a different way.
 
 # Possible solutions
 - #1 For each car create tag array that contains all possible search keywords combinations and to search just use array-contains mehod.
 ```
 const tags = ['audi', 'tt', 'audi tt', 'tt audi'] 
 ```
 But as you see if you want to combine 2 keywords you have 4 combinations so imagine how big this array will get if you wanted to combine 4 or 5 words.
 - #2 **BEST SOLUTION** Instead of keeping your tags as array make it an object where each tag is equal to true. This way, you can query simultaneously by any number of tags. 
  ```
 const tags = {'audi': true, 'tt': true} 
 ```
 After you type your keywords they are being count and based on that function creates multiple where clauses.

## Technology 🔨
- React
- Firebase
- Next JS
- Typescript

