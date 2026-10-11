# Tax professional review request — not a completed review

Target: https://1099-tax-calculator-main.vercel.app/
Scope: simplified 2026 federal estimator for a sole proprietor with only freelance income. Review index.html and the two guides. No tax professional has reviewed or signed off yet. Owner must arrange the review; no outreach has been sent.

Please check against current IRS/SSA primary sources:

- Net profit = max(0, gross revenue minus eligible business expenses). Loss offsets are not modeled.
- Net SE earnings = 92.35% of net profit; SE earnings below $400 generate zero SE tax.
- Regular SE tax: 12.4% on earnings up to $184,500 plus 2.9% Medicare on all SE earnings. No W-2 wages are assumed.
- Deduct half of regular SE tax for the simplified federal calculation.
- Basic standard deductions: $16,100 Single; $32,200 Married Filing Jointly; $24,150 Head of Household.
- Progressive thresholds: Single 12,400 / 50,400 / 105,700 / 201,775 / 256,225 / 640,600; Joint 24,800 / 100,800 / 211,400 / 403,550 / 512,450 / 768,700; Head 17,700 / 67,450 / 105,700 / 201,750 / 256,200 / 640,600. Marginal rates 10/12/22/24/32/35/37%.
- Gross revenue $75,000 minus expenses $10,000, Single: SE tax $9,184.2075; simplified federal tax $5,068.94755; total $14,253.15505 before display rounding. This is an implementation reference, not independently certified tax advice.
- Effective tax rate uses net business profit, not gross revenue. After-tax income subtracts expenses and estimated taxes. Monthly/quarterly targets divide annual estimated tax by 12/4; they are not required IRS installments.
- Explicit omissions: other income/spouse income, state/local taxes, credits, QBI, Additional Medicare Tax, itemized deductions, age/blindness adjustments, retirement and health insurance adjustments, and prior payments/withholding.
- Confirm 2026 estimated-payment dates, safe-harbor percentages and conditions, deduction descriptions, and business-use/recordkeeping limitations in guides.

Record the reviewer's actual name/qualification, date, scope, primary sources and corrections only after review takes place. Do not advertise an unperformed review.
