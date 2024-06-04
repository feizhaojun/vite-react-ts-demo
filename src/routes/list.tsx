// import React, { useState } from 'react';

function List() {

  // const [list, setList] = useState([{ name: 'Mukti' }]);
  // const [page, setPage] = useState(1);
  // const handleClick = () => {
  //   fetch('https://feizhaojun.com/?rest_route=/wp/v2/posts&per_page=5&page=' + page).then(res => res.json()).then(res => {
  //     setList([])
  //     setList(res)
  //     const newPage = page + 1
  //     setPage(newPage)
  //   })
  // }

  return (
    <div>
      {/* {
        list.map((el) => {
          return (<><div>标题内容测试</div><div>{el?.title?.rendered}</div></>)
        })
      } */}
      {/* <button onClick={handleClick}>Click</button> */}
    </div>
  );
}

export default List;