let lastId = 0;

export default function (prefix = 'uxid_id_') {
    lastId++;
    return `${prefix}${lastId}`;
}
