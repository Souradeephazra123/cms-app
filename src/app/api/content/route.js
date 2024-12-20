import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import { getAllContentFromDB } from "../../../lib/model/content/content.model";
import { modifyBody } from "../../../lib/model/content/content.controller";

export async function GET() {
  try {
    await connectToDB();

    const data = await getAllContentFromDB();

    return NextResponse.json(
      {
        data: JSON.stringify(data),
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    console.error("Error fetching data from DB:", error);
    return NextResponse.json(
      {
        message: "Unable to fetch data from DB",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    //save data to the DB
    await modifyBody(body);

    return NextResponse.json(
      {
        message: "Data Saved successfully",
      },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error) {
    console.error("Error saving data to DB:", error);
    return NextResponse.json(
      {
        message: "Unable to save data to DB",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
