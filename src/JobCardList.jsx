import { JobCard } from "./JobCard";

export const JobCardList = ({ jobs }) => {
	return (
		<div className="JobCardList">
			{jobs.map((job) => (
				<JobCard
					key={job.id}
					id={job.id}
					title={job.title}
					salary={job.salary}
					equity={job.equity}
					companyName={job.companyName}
				/>
			))}
		</div>
	);
};
