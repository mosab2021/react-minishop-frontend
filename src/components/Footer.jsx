export default function Footer(){
    return(
        <footer style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            padding:'1rem 2rem',
            margin:'2rem',
            backgroundColor:'#f2f2f2',
            borderTop:'1px solid #ddd',
            textAlign:'center',
            color:'black'


            }}>
            <p>copyright® </p>
            <p>made by react & nodejs </p>
            <a href="khlili.com">ceo of the site</a>
        </footer>
    );
}