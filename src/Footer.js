const Footer = ({listCount}) => {
  return (
    <footer>
        <p>{listCount} List Item{listCount === 1? "":"s"}</p>
    </footer>
  )
}

export default Footer