import React from 'react'


import {CIcon} from  '@coreui/icons-react';
import {CImg, CButton, CButtonGroup} from '@coreui/react';



//this is to test whatevere we want and delete it when production is ready 

// const Something= ()=>{
//     const text = "Line One\nLine2\nLine3"

//     return(
//         <>
//         <h3>Test something : display-linebreak</h3>
//             <div className='display-linebreak'> 
//                     {text}
//             </div>
//         </>
//  )
// }



const Something=()=>{
return (
  <div className="container">
  <div class="row">
      <h1>Available bins
      </h1>
      
  </div>
  <div class="row">
  <form>  
     <CButton className="btn btn-pill btn-primary">Add Bin</CButton>
  </form>
  </div>
  
  <table className="table table-striped table-hover table-borderless">
 
  <thead>
    <tr>
    <th scope="col"></th>  
    <th scope="col">Picture</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      

    </tr>
  </thead>
  <tbody>
    <tr>
    <td>
        <form>
        <CButtonGroup>
            <CButton name ="edit" color={"primary"} variant={"ghost"}><CIcon name={'cilPencil'} /></CButton>
            <CButton name="delete" color={"danger"}  variant={"ghost"}><CIcon name={'cilBasket'} /></CButton>
        </CButtonGroup>
        </form>
    </td>  
    <td> <CImg
    src="https://picsum.photos/1024/480/?image=54"
    className="mb-2"
    height={40}
  /></td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      
    </tr>
    




  </tbody>
</table>
</div>
)
}


export default Something;