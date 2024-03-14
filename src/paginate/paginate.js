import _ from "lodash";
 function Paginate(items, pageNo, pageSize) {
  const startIndex = (pageNo - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
export default Paginate;
