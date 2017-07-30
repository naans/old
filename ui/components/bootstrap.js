import React from 'react'
import {Link} from 'react-router-dom'
import PictureInput from './parts/PictureInput'

export const Navbar = props =>
    <nav className={'navbar navbar-' + (props.inverse ? 'inverse' : 'default')} style={{margin: 0}} role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                    <span className="sr-only">Menu</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                {props.title ? props.title : null}
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav">
                    {props.links.map(link => <li key={link[0]}><Link to={link[0]}>{link[1]}</Link></li>)}
                </ul>
            </div>
        </div>
    </nav>

export const Panel = props =>
    <div className="container-fluid" style={{marginTop: '15px'}}><div className={'panel panel-' + props.type}>
      <div className="panel-heading">
        <h3 className="panel-title">{props.title}</h3>
      </div>
      <div className="panel-body">
        {props.children}
      </div>
    </div></div>

export const Table = props =>
    <div className="table-responsive"><table className="table table-bordered table-hover">
    <thead><tr>
        {props.titles.map(title => <th key={title.name}>{title.displayName}</th>)}
        <th></th>
    </tr></thead>
    <tbody>
        {props.items.map(item => <tr key={item.id}>
            {props.titles.map(title => <td key={item.id+title.name}>{item[title.name]}</td>)}
            <td>
            {props.buttons.map(btn =>
                <Link key={btn.text} to={btn.url.replace(':id', item.id)} type="button" className={"btn btn-" + btn.type}>
                    <span className={"glyphicon glyphicon-" + btn.icon} aria-hidden="true"></span> {btn.text}
                </Link>
            )}
            </td>
        </tr>)}
    </tbody>
    </table></div>

export const Form = props =>
    <form className="form-horizontal">
      {props.children}
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="button" className="btn btn-primary" onClick={props.action}>{props.submitText}</button>
        </div>
      </div>
    </form>

export const Input = props =>
  <div className="form-group">
    <label className="col-sm-2 control-label">{props.displayName}</label>
    <div className="col-sm-10">
      { props.type == 'textarea' ? <textarea name={props.name} className="form-control" onChange={props.onChange} value={props.value} placeholder={props.placeholder}></textarea> :
        props.type == 'select' ? <select name={props.name} className="form-control" onChange={props.onChange}>
            {props.options.map(opt => <option key={opt.id} selected={props.value == opt.id} value={opt.id}>{opt[props.optionLabel]}</option>)}
        </select> :
        props.type == 'file' ? <input name={props.name} type={props.type} onChange={props.onChange} /> :
        props.type == 'picture' ? <PictureInput name={props.name} category={props.category} value={props.value} onChange={props.onChange} /> :
        <input name={props.name} type={props.type} onChange={props.onChange} value={props.value} className="form-control" placeholder={props.placeholder} />
      }
    </div>
  </div>

export const Alert = props =>
    <div className={'alert alert-' + props.type} role="alert">
        <button type="button" className="close" aria-label="Close" onClick={props.onClose}><span aria-hidden="true">&times;</span></button>
        {props.children}
    </div>

export const Button = props =>
    <button type="button" onClick={props.onClick} className={'btn btn-' + props.type}>
      { props.icon ? <span className={'glyphicon glyphicon-' + props.icon} aria-hidden="true"></span> : '' }
       { props.children }
    </button>

export const Popup = props =>
  <div style={{position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 1,
    overflow: 'auto', background: 'rgba(0, 0, 0, 0.4)'}}>
    <div className="container-fluid" style={{marginTop: '15px'}}><div className={'panel panel-' + props.type}>
        <div className="panel-heading">
          <div className="pull-right">
            <button type="button" className="close" aria-label="Close" onClick={props.onClose}><span aria-hidden="true">&times;</span></button>
          </div>
          <h3 className="panel-title">{props.title}</h3>
        </div>
        <div className="panel-body">
          {props.children}
        </div>
    </div></div>
  </div>
