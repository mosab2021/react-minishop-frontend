export default function Skeleton({width=200,height=20}){
        return(
       
            <div style={{width,
            height,
            borderRadius:'4px',
                marginBottom:'10px',
                animation:'pulse 0.5s ease-in-out infinite',
                background:'#eee'
                }}>
 <style>
                {`
                    @keyframes pulse {
                    0% { opacity:0.6 }
                    50% { opacity: 1 }
                    100% { opacity: 0.6}
                }
            `}
            </style>
            </div>
           
       
    )
}