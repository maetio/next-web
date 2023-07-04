import { competitionsCollection } from "config/server-collections";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
 
/**
 * Get request for the competitions route
 * Endpoint defined as `competitions/[id]/[startTime]/[endTime]`
 *
 * @export
 * @param {Request} request
 * @param {{ params: { queryParams: String[] } }} { params }
 * @return {*} 
 */
export async function GET(_request: Request, { params }: { params: { queryParams: Array<string | undefined> } }) {
	// get the parameters from the query
	const [compID, startTime, endTime] = params.queryParams;

	// if the comp id is provided, return that competition
	if (compID && compID !== "all") {
		const compDoc = await competitionsCollection.doc(compID).get();
		return NextResponse.json({ ...compDoc.data(), id: compDoc.id });
	}

	// set the start timestamp
	const startDate = new Date(startTime || 0);
	const startTimestamp = Timestamp.fromDate(startDate);

	// set the end timestamp to 100 years in the future from today
	const futureDate = new Date();
	futureDate.setFullYear(futureDate.getFullYear() + 100);
	const endTimestamp = Timestamp.fromDate(endTime ? new Date(endTime) : futureDate);

	// set the use cases for the query
	const querySnapshot = await competitionsCollection.where("startTimestamp", ">=", startTimestamp).where("startTimestamp", "<=", endTimestamp).get();
	return NextResponse.json(querySnapshot.docs);
}