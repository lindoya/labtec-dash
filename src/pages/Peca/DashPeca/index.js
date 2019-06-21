import React, { Component } from 'react'
import { Select, Icon } from 'antd'
import { getAllParts } from '../../../services/peca'

import './index.css'

const { Option } = Select;

class DashPeca extends Component {
//   state = {
//     avancado: false,
//     order: {
//       field: 'createdAt',
//       acendent: true,
//     },
//     global: '',
//     item: '',
//     description: '',
//     costPrice: '',
//     salePrice: '',
//     createdAt: '',
//     page: 1,
//     total: 25,
//     count: 0,
//     show: 0,
//     rows: [],
//   }

//   changeTotal = (value) => {
//     this.setState({
//       total: value
//     }, () => {
//       console.log(this.state)
//       this.getAll()
//     })
//   }

//   getAll = async () => {
//     const query = {
//       filters: {
//         part: {
//           global: {
//             fields: ['item', 'description', 'costPrice', 'salePrice'],
//             value: this.state.global,
//           },
//           specific: {
//             item: this.state.item,
//             description: this.state.description,
//             costPrice: this.state.costPrice,
//             salePrice: this.state.salePrice,
//           }
//         }
//       },
//       page: 1,
//       total: 25,
//       order: this.state.order,
//     }

//     await getAllParts(query).then(
//       resposta => this.setState({
//         page: resposta.data.page,
//         count: resposta.data.count,
//         show: resposta.data.show,
//         rows: resposta.data.rows,
//       })
//     )
//   }

//   TableParts = () => (
//     <div className='gerCmp-div-mainHeader'>
//       <div className='gerCmp-div-table-information'>
//         <div className='gerCmp-div-table-information-total'>
//           <label className='gerCmp-label-table-information'>
//             Quantidade por página:
//           </label>
//           <Select defaultValue="25" onChange={this.changeTotal}>
//             <Option value="10">10</Option>
//             <Option value="25">25</Option>
//             <Option value="50">50</Option>
//             <Option value="100">100</Option>
//           </Select>
//         </div>
//         <div className='gerCmp-div-table-information-count'>
//           <label className='gerCmp-label-table-information'>
//             {`Mostrando ${this.state.show}/${this.state.count} empresas.`}
//           </label>
//         </div>
//       </div>
//       <div className='gerCmp-div-table-separeteLineMain' />
//       <div className='gerCmp-div-table-header'>
//         <div className='gerCmp-div-table-cel-cnpj'
//           // onClick={() => this.changeOrder('item')}
//           >
//           {this.state.order.field === 'item' ?
//             <div className='gerCmp-div-icon'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='gerCmp-div-icon'></div>}
//           <h2 className='gerCmp-div-table-label'>Item</h2>
//         </div>
//         <div className='gerCmp-div-table-cel-rs'
//           // onClick={() => this.changeOrder('description')}
//           >
//           {this.state.order.field === 'description' ?
//             <div className='gerCmp-div-icon'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='gerCmp-div-icon'></div>}
//           <h2 className='gerCmp-div-table-label'>description</h2>
//         </div>
//         <div className='gerCmp-div-table-cel-nameContact'
//           // onClick={() => this.changeOrder('costPrice')}
//           >
//           {this.state.order.field === 'costPrice' ?
//             <div className='gerCmp-div-icon'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='gerCmp-div-icon'></div>}
//           <h2 className='gerCmp-div-table-label'>costPrice</h2>
//         </div>
//         <div className='gerCmp-div-table-cel-tel'
//           // onClick={() => this.changeOrder('salePrice')}
//           >
//           {this.state.order.field === 'salePrice' ?
//             <div className='gerCmp-div-icon'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='gerCmp-div-icon'></div>}
//           <h2 className='gerCmp-div-table-label'>salePrice</h2>
//         </div>
//         <div className='gerCmp-div-table-cel-createdAt'
//           // onClick={() => this.changeOrder('createdAt')}
//           >
//           {this.state.order.field === 'createdAt' ?
//             <div className='gerCmp-div-icon'>
//               {this.state.order.acendent ?
//                 <Icon type="caret-down" /> :
//                 <Icon type="caret-up" />}
//             </div>
//             : <div className='gerCmp-div-icon'></div>}
//           <h2 className='gerCmp-div-table-label'>Criado em</h2>
//         </div>
//       </div>
//       <div className='gerCmp-div-table-separeteLineMain' />
//       {
//         this.state.rows.map((line) =>
//           <div className='gerCmp-div-table-list'>
//             <div className='gerCmp-div-tableRow'>
//               <div className='gerCmp-div-table-cel-cnpj'>
//                 <label className='gerCmp-div-table-label-cel'>
//                   {line.item}
//                 </label>
//               </div>
//               <div className='gerCmp-div-table-cel-rs'>
//                 <label className='gerCmp-div-table-label-cel'>
//                   {line.description}
//                 </label>
//               </div>
//               <div className='gerCmp-div-table-cel-nameContact'>
//                 <label className='gerCmp-div-table-label-cel'>
//                   {line.costPrice}
//                 </label>
//               </div>
//               <div className='gerCmp-div-table-cel-tel'>
//                 <label className='gerCmp-div-table-label-cel'>
//                   {line.salePrice}
//                 </label>
//               </div>
//             </div>
//             <div className='gerCmp-div-table-separeteLinerow' />
//           </div>
//         )
//       }
//     </div>
//   )

  render() {
    return (
      <div className='div-comp-card'>

        <div className='div-comp-Linha div-comp-header'>
          <h1 className='div-comp-title'>Gerenciar peças</h1>
        </div>

        dasdasd
          {/* <this.TableParts /> */}
        
      </div>
    )
  }
}

export default DashPeca

