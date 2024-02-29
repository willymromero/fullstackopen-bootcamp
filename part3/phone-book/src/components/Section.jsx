function Section ({ children, name, title }) {
  return (
    <section
      className='section-container'
      id={name}

    >
      <h2 className='section__title'>{title}</h2>
      <div className='section__content'>
        {children}
      </div>
    </section>
  )
}
export default Section
