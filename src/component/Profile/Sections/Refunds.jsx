import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Refunds() {
  const [refundStatus, setRefundStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRefundStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const res = await axios.get("http://localhost:8080/user/refund-status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRefundStatus(res.data.status || "None");
      } catch (err) {
        console.error(err);
        setError("Failed to load refund status.");
      } finally {
        setLoading(false);
      }
    };

    fetchRefundStatus();
  }, []);

  const handleRequestRefund = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await axios.post(
        "http://localhost:8080/user/request-refund",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Refund requested successfully!");
      setRefundStatus("Pending");
    } catch (err) {
      console.error(err);
      alert("Failed to request refund. Please try again later.");
    }
  };

  if (loading) return <div className="text-gray-600">Loading refund status...</div>;

  return (
    <div className="bg-gradient-to-br from-black via-pink-50 to-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Refund Information</h2>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <p className="mb-4">
        Current Refund Status:{" "}
        <strong className="text-blue-700">
          {refundStatus || "Unavailable"}
        </strong>
      </p>

      {refundStatus === "None" && (
        <button
          onClick={handleRequestRefund}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Request Refund
        </button>
      )}

      {refundStatus === "Pending" && (
        <p className="text-yellow-600 font-medium">Your refund request is pending review.</p>
      )}

      {refundStatus === "Approved" && (
        <p className="text-green-600 font-medium">Your refund has been approved.</p>
      )}

      {refundStatus === "Rejected" && (
        <p className="text-red-600 font-medium">Your refund request was rejected.</p>
      )}

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Refund Policy:</h3>
        <p className="text-gray-700">
          Refunds are available within 7 days of purchase, subject to review. Please contact support for any further queries.
        </p>
      </div>
    </div>
  );
}
