import React from 'react';
import './styles.scss'
import Input from '../../../../components/UI/Input';
import { SearchIcon } from '../../../../assets';

type Props = {}
export default function Search(props: Props) {
  return (
    <div className="search">
      <h2>Blogs</h2>
      <div className="input-wrapper">
        <Input startIcon={SearchIcon}/>
      </div>
    </div>
  )
}
