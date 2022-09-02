import styles from "./progress.module.css"
export default function Progress() {
  const{outLine,innerLine} = styles
  return(
    <div style={{display:"grid",gridTemplateRows:"min-content"}}>
      <div className={outLine}>
        <div style={{width:"20%"}} className={innerLine}></div>
      </div>
    </div>
  )
}
