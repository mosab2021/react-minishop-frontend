export default function Loader(){
    return(
        <div style={{padding:"2rem",textAlign:'center'}}>
            <div style={{width:'40px',
            height:'40px',
            border:'4px solid #999',
            borderRadius:'50%'
            ,margin:'auto',
                borderTopColor:'transparent',
                animation:'spin 1s linear infinite'
                }}>


            </div>
            <style>
                {`
                @keyframes spin {
                100% {
                transform:rotate(360deg)}}
                `}
            </style>
        </div>
    )
}