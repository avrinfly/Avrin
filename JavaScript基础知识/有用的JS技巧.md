### 1.确保数组值
使用grid，需要重新创建原始数据，且每行的列长度可能不匹配，为确保不匹配行之间的长度相等，可以用```Array.fill```方法。
```
let array = Array(5).fill('');
console.log(array); //['','','','','']
```

### 2. 获取数组唯一值(去重)
ES6提供了从数组中提取唯一值的两种非常简洁的方法。但它们不能很好地处理非基本类型的数组
```
const cause = [
    'Mazda',
    'Ford',
    'Renault',
    'Opel',
    'Mazda'
]
const uniqueWithArrayFrom = Array.from(new Set(cause));
console.log(uniqueWithArrayFrom);//['Mazda','Ford','Renault','Opel',]

const uniqueWithSpreadOperator = [...new Set(cause)];
console.log(uniqueWithSpreadOperator); //同上
```

### 3. 使用展开运算符合并对象和对象数组
对象合并是很常见的，可使用ES6新增特性来更好、更简洁的处理合并的过程。
```
//merging objects
const product = { name: 'Milk', packaging: 'Plastic', price: '5$' };
const manufacturer = { name: 'Company Name', address: 'Company Address' };

const mergeTargetObjects = { ...product, ...manufacturer };
console.log(mergeTargetObjects); //{ name: "Company Name", packaging: "Plastic", price: "5$", address: "Company Address" }

// merging an array of objects into one
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'yes' },
    { name: 'Marseille', visited: 'no' },
    { name: 'Rome', visited: 'no' },
    { name: 'Milan', visited: 'yes' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'no' },
    { name: 'Berlin', visited: 'yes' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'no' },
];

const result = cities.reduce((accumulator,item)=>{
    return {
        ...accumulator,
        [item.name]: item.visited
    }
},{});
console.log(result);
/*
Berlin: "yes"
Genoa: "no"
Hamburg: "yes"
Lyon: "yes"
Marseille: "no"
Milan: "yes"
New York: "no"
Palermo: "yes"
Paris: "no"
Rome: "no"
*/
参考:
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

### 4. 数组map的方法(不使用Array.Map)
另一种数组map的实现方式，不使用```Array.map```
Array.from还可以接受第二个参数，作用类似于数组的```map```方法，用于对每个元素进行处理，将处理后的值放入返回的数组。如下：
```
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'yes' },
    { name: 'Marseille', visited: 'no' },
    { name: 'Rome', visited: 'no' },
    { name: 'Milan', visited: 'yes' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'no' },
    { name: 'Berlin', visited: 'yes' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'no' },
];

const cityNames = Array.from(cities, ({name}) => name);
console.log(cityNames); //["Paris", "Lyon", "Marseille", "Rome", "Milan", "Palermo", "Genoa", "Berlin", "Hamburg", "New York"]
```

### 5. 有条件的对象属性
不再需要根据一个条件创建两个不同的对象，可以使用展开运算符来处理。
```
const getUser = (emailIncluded) => {
    return {
        name: 'Arvin',
        surname: 'QQ',
        ...emailIncluded && { email : 'arvin@qq.com' }
    }
}
const user = getUser(true);
console.log(user); //{ name: "Arvin", surname: "QQ", email: "arvin@qq.com" }

const userWithoutEmail = getUser(false);
console.log(userWithoutEmail); //{ name: "Arvin", surname: "QQ" }
```

### 6. 解构原始数据
有时一个对象包含了很多属性，我们只需要其中的几个，就可以用解构的方式来提取我们需要的属性。
```
const rawUser = {
    name: 'Arvin',
    surname: 'QQ',
    email: 'arvin@qq.com',
    displayName: 'SuperCoolArvin',
    joined: '2019-07-01',
    image: 'path-to-the-image',
    followers: 36
    ...
}
```
我们需要提取两个部分，分别是用户及用户信息。我们可以这样做:
```
let user = {}, userDetails = {};
({ name: user.name, surname: user.surname, ...userDetails } = rawUser);
console.log(user); //{ name: "Arvin", surname: "QQ" }
console.log(userDetails); //{ email: "arvin@qq.com", displayName: "SuperCoolArvin", joined: "2019-07-01", image: "path-to-the-image", followers: 36 }
```

### 7. 动态属性名(还可优化)
在以前，如果属性名需要是动态的，我们应首先声明一个对象，然后分配一个属性。现在可以用ES6来做到这一点：
```
const dynamic = 'email';
let user = {
    name: 'Arvin',
    [dynamic]: 'arvin@qq.com'
}
console.log(user); // { name: "Arvin", email: "arvin@qq.com" }
```