/**
 * Send an email to all users that have enabled email alerts
 * 
 */
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {


  res.status(200).json({data: "Called send email API"});


}
