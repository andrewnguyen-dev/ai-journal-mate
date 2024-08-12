import React from 'react'

const FormTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold text-foreground">
        {title}
      </h1>
    </div>
  )
}

export default FormTitle