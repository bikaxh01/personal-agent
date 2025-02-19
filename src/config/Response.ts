import { NextResponse } from "next/server";

export function sendResponse(
  data: any = [],
  message: string = "Success",
  success: boolean = true,
  statusCode: number = 200
) {
  return NextResponse.json({ success, message, data }, { status: statusCode });
}
