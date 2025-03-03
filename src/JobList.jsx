import { useEffect, useState } from "react";
import { JoblyApi } from "./api";
import { JobCardList } from "./JobCardList";
import { SearchForm } from "./SearchForm";

export const JobList = () => {
	const [jobs, setJobs] = useState([]);
	async function search(title) {
		try {
			const jobs = await JoblyApi.getJobs(title || null);
			setJobs(jobs);
		} catch (err) {
			console.error(err);
		}
	}
	useEffect(() => {
		search();
	}, []);

	return (
		<div className="JobList col-md-8 offset-md-2">
			<SearchForm search={search} />
			{jobs.length ? (
				<JobCardList jobs={jobs} />
			) : (
				<p>Sorry, no results were found!</p>
			)}
		</div>
	);
};
