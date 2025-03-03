import { useEffect, useState } from "react";
import { JoblyApi } from "./api";
import { CompanyCard } from "./CompanyCard";
import { SearchForm } from "./SearchForm";

export const CompanyList = () => {
	const [companies, setCompanies] = useState([]);

	async function search(name) {
		try {
			const companies = await JoblyApi.getCompanies(name || null);
			setCompanies(companies);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		search();
	}, []);

	return (
		<div className="CompanyList col-md-8 offset-md-2">
			<SearchForm search={search} />
			{companies.length ? (
				companies.map((company) => (
					<CompanyCard
						key={company.handle}
						handle={company.handle}
						name={company.name}
						description={company.description}
						logoUrl={company.logoUrl}
					/>
				))
			) : (
				<p>Sorry, no results were found!</p>
			)}
		</div>
	);
};
