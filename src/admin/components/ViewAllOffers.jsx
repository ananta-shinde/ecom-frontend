const ViewAllOffers = () => {
    const offersList = [
        {
            id: 1,
            title: "Summer Blowout Sale",
            description: "Get 20% off on all clothing and apparel.",
            discountPercentage: 20,
            promoCode: "SUMMER20",
            validUntil: "2026-08-31",
            isActive: true
        },
        {
            id: 2,
            title: "Tech Upgrade Promo",
            description: "Flat 10% discount on smartphones and laptops.",
            discountPercentage: 10,
            promoCode: "TECH10",
            validUntil: "2026-05-15",
            isActive: true
        },
        {
            id: 3,
            title: "Welcome Bonus",
            description: "Special 15% off for first-time buyers on any category.",
            discountPercentage: 15,
            promoCode: "WELCOME15",
            validUntil: "2026-12-31",
            isActive: true
        },
        {
            id: 4,
            title: "Flash Sale Friday",
            description: "Massive 50% off on selected skincare products.",
            discountPercentage: 50,
            promoCode: "FLASH50",
            validUntil: "2026-04-24", 
            isActive: false 
        },
        {
            id: 5,
            title: "Holiday Mega Bundle",
            description: "Buy more, save more! 30% off site-wide during the holidays.",
            discountPercentage: 30,
            promoCode: "HOLIDAY30",
            validUntil: "2027-01-05",
            isActive: false
        }
    ];

    return (
        <div className="container mt-4 mb-5">
            <h3 className="mb-4 text-secondary">Manage Offers</h3>
            
            <div className="border rounded shadow-sm bg-white p-3">
                
                <div className="row border-bottom pb-2 mb-2 fw-bold text-muted align-items-center">
                    <div className="col-4">Offer Title</div>
                    <div className="col-2 text-center">Discount</div>
                    <div className="col-2 text-center">Promo Code</div>
                    <div className="col-2 text-center">Status</div>
                    <div className="col-2 text-end">Actions</div>
                </div>

                {offersList.map(offer => (
                    <div className="row border-bottom py-3 align-items-center" key={offer.id}>
                        
                        <div className="col-4">
                            <div className="fw-bold">{offer.title}</div>
                            <small className="text-muted">Valid till: {offer.validUntil}</small>
                        </div>
                        
                        <div className="col-2 text-center text-success fw-semibold">
                            {offer.discountPercentage}% OFF
                        </div>
                        
                        <div className="col-2 text-center">
                            <span className="badge bg-light text-dark border">{offer.promoCode}</span>
                        </div>
                        
                        <div className="col-2 text-center">
                            {offer.isActive ? (
                                <span className="badge bg-success">Active</span>
                            ) : (
                                <span className="badge bg-secondary">Inactive</span>
                            )}
                        </div>
                        
                        <div className="col-2 text-end">
                            <button className="btn btn-sm btn-outline-primary">Edit</button>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewAllOffers;