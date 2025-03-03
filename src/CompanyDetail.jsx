import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { JoblyApi } from "./api";
import { JobCardList } from "./JobCardList";
import "./CompanyDetail.css";

export const CompanyDetail = () => {
	const { handle } = useParams();
	const [company, setCompany] = useState();

	useEffect(
		function loadCompany() {
			async function getCompany() {
				try {
					const company = await JoblyApi.getCompany(handle);
					setCompany(company);
				} catch (err) {
					console.error(err);
				}
			}
			getCompany();
		},
		[handle]
	);

	return (
		<div className="CompanyDetail col-md-8 offset-md-2">
			{company ? (
				<>
					<h4 className="CompanyDetail-header">{company.name}</h4>
					<p className="CompanyDetail-desc">{company.description}</p>
					<JobCardList jobs={company.jobs} />
				</>
			) : (
				<p>Loading ...</p>
			)}
		</div>
	);
};
