export default function Status({value}){return <span className={`status status-${(value||'').toLowerCase().replaceAll(' ','-')}`}>{value}</span>}
