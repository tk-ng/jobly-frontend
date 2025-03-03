import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./JobCard.css";

export const JobCard = ({ id, title, salary, equity, companyName }) => {
	const { hasAppliedToJob, applyToJob } = useContext(UserContext);
	const [applied, setApplied] = useState();

	useEffect(() => {
		setApplied(hasAppliedToJob(id));
	}, [id, hasAppliedToJob]);

	const handleApply = async () => {
		if (hasAppliedToJob(id)) return;
		try {
			await applyToJob(id);
		} catch (err) {
			console.error(err);
			return;
		}
		setApplied(true);
	};

	const addCommas = (salary) => {
		return (
			"$" + salary.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
		);
	};
	return (
		<Card className="JobCard">
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<p>{companyName}</p>
				{salary && (
					<div>
						<small>Salary: {addCommas(salary)}</small>
					</div>
				)}
				{equity !== undefined && (
					<div>
						<small>Equity: {equity}</small>
					</div>
				)}
				<Button
					color="danger"
					className="text-uppercase float-end"
					onClick={handleApply}
					disabled={applied}
				>
					{applied ? "Applied" : "Apply"}
				</Button>
			</CardBody>
		</Card>
	);
};
