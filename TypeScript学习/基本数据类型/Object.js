create({ prop: 0 }); // ok
create(null); // ok
create(42); // error
create('iven'); // error
create(true); // error
create(undefined); // error
