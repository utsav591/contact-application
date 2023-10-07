const notFound = (req,res,next)=>{
    const error = new error(`Not Found - ${req.originalUrl}`)
    res.status(400)
    next(error);
}


const errorHandler =(err ,req,res,next) =>{
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;
    res.status(statusCode);
    
    res.json({
        remark: err.massage,
        stack: process.env.NODE_ENV==='devlopement' ? err.stack: null
    })
}

export { notFound , errorHandler}