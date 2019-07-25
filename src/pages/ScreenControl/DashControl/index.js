import React, { Component } from 'react'
import './index.css'

// Pages = () => (

//   <div className='gerCmp-div-table-footer'>
//     {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : ''}
//     {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : ''}
//     {this.state.page >= 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : ''}
//     {this.state.page >= 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : ''}
//     <div className='div-buttonSelected-dashComp' type="primary">{this.state.page}</div>
//     {this.state.page < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : ''}
//     {this.state.page + 1 < (this.state.count / this.state.total) ? <Button type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : ''}
//     {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : ''}
//     {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : ''}
//   </div>
// )  

// render() {
//   return (
//     <div className='div-mainHeader-dashTec'>
//       <div className='div-table-separeteLineMain-dashTec' />
//       <div className='div-table-header-dashTec'>
//         <div className='div-table-cel-Os-dashTec'
//           onClick={() => this.changeOrder('Os')}
//         >
//           {this.state.order.field === 'Os' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>OS</h2>
//         </div>
//         <div className='div-table-cel-contrato-dashTec'
//           onClick={() => this.changeOrder('contrato')}>
//           {this.state.order.field === 'contrato' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>Contrato</h2>
//         </div>
//         <div className='div-table-cel-garantia-dashTec'
//           onClick={() => this.changeOrder('garantia')}>
//           {this.state.order.field === 'garantia' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>Garantia</h2>
//         </div>
//         <div className='div-table-cel-serialNumber-dashTec'
//           onClick={() => this.changeOrder('serialNumber')}>
//           {this.state.order.field === 'serialNumber' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>Número de série</h2>
//         </div>
//         <div className='div-table-cel-razaoSocial-dashTec'
//           onClick={() => this.changeOrder('razaoSocial')}>
//           {this.state.order.field === 'razaoSocial' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>Razão social</h2>
//         </div>
//         <div className='div-table-cel-tipoMarcaModelo-dashTec'
//           onClick={() => this.changeOrder('type')}>
//           {this.state.order.field === 'type' ?
//             <div className='div-icon-dashTec'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='div-icon-dashTec'></div>}
//           <h2 className='div-table-label-dashTec'>Tipo - Marca - Modelo</h2>
//         </div>
//       </div>
//       <div className='div-table-separeteLineMain-dashTec' />
//       {this.state.loading ? <div className='spin-dashPeca'><Spin spinning={this.state.loading} /></div> : null}
//       {this.state.rows === undefined ? 'Não há entradas cadastrada' : this.state.rows.map((line) =>
//         <div className='div-table-list-dashTec'>
//           {this.renderRedirect()}
//           <div className={this.props.className} onClick={() => this.redirectToAnalise(line)}>
//             <div className='div-table-cel-Os-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {line.id}
//               </label>
//             </div>
//             <div className='div-table-cel-contrato-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {line.conditionType}
//               </label>
//             </div>
//             <div className='div-table-cel-garantia-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {line.garantia}
//               </label>
//             </div>
//             <div className='div-table-cel-serialNumber-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {line.serialNumber}
//               </label>
//             </div>
//             <div className='div-table-cel-razaoSocial-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {line.razaoSocial}
//               </label>
//             </div>
//             <div className='div-table-cel-modelo-dashTec'>
//               <label className='div-table-label-cel-dashTec'>
//                 {`${line.type} - ${line.mark} - ${line.model}`}
//               </label>
//             </div>
//             {/* <div className='div-table-cel-modelo-dashTec'>
//                   <label className='div-table-label-cel-dashTec'>
//                     {line.status}
//                   </label>
//                 </div> */}
//               </div>
//               <div className='div-table-separeteLinerow-dashTec' />
//             </div>
//           )
//         }
//         <div className='gerCmp-div-table-footer'>
//           <this.Pages />
//         </div>
//     </div>
//   )
// }
// }

class DashScreenControl extends Component {
  render() {
    return (
      <div className='div-card-control'>
        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Controle geral</h1>
        </div>
      </div>
    )
  }
}

export default DashScreenControl