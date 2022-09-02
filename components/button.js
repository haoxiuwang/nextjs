import styles from "./button.module.css"
import {cla} from "./helper.js"
const{button,checkBox} = styles

function CButton() {
  return(
    <div className={cla(button,checkBox)}>
      随机?
    </div>
  )
}
function Button() {
  return <div className={button}>
    开始
  </div>
}

export {CButton,Button}
