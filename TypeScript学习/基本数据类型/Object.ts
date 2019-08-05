//“对象”是表示非基元类型的类型，即任何非number、string、Boolean、symbol、null或undefined的类型。
//对于object类型，使用类似object.create这种API可以更好的表示。比如：
declare function create(o: object | null): void;
create({ prop: 0 }); // ok
create(null); // ok

create(42); // error
create('iven'); // error
create(true); // error
create(undefined); // error