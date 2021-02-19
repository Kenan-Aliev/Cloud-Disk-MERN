import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import './disk.css'
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";

const Popup = () => {
    const dispatch=useDispatch()
    const [dirName,setDirName] = useState('')
    const currentDir=useSelector(s=>s.files.currentDir)
    const popupDisplay = useSelector(s=>s.files.popupDisplay)
    function createHandler(){
        dispatch(createDir(currentDir,dirName))
        setDirName('')
        dispatch(setPopupDisplay('none'))
    }
    return (
        <div className='popup' onClick={()=>dispatch(setPopupDisplay('none'))} style={{display:popupDisplay}}>
            <div className="popup__content" onClick={(e)=>e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={()=>dispatch(setPopupDisplay('none'))}>
                        X
                    </button>
                </div>
                <Input type='text' value={dirName} setValue = {setDirName} placeholder='Введите название папки...'/>
                <button className="popup__create" onClick={()=>createHandler()}>Создать</button>
            </div>

        </div>
    );
};

export default Popup;