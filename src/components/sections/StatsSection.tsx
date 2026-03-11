const StatsSection  =  ({multi_display}) => {
    return(
        <div className="multi_display">
            <ul>
                {multi_display.map((item)=>(
                    <li key={item.label} className="card">
                        <span className="label">{item.label}</span>
                        <span className="amount">{item.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default StatsSection;