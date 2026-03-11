const StatsSection  =  ({multi_display}) => {
    return(
        <div className="multi_display">
            <ul>
                {multi_display.map((item)=>(
                    <li key={item.label} className="card">
                        <span>{item.label}</span>
                        <span>{item.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default StatsSection;