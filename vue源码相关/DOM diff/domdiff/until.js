function until() { }
until.isString = (node) => {
    return typeof node === 'string';
}

export default until;