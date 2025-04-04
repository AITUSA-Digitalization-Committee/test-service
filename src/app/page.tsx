'use client'

import { api } from "@/api/instance";
import { ApiResponse, Student } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {

  const [student, setStudent] = useState<Student | null>(null);
  const [token, setToken] = useState("");

  { /* Получаем token */ }
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      if (event.data.type === "INIT") {
        console.log("Received token:", event.data.data)
        setToken(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  { /* Получаем студента */ }
  const fetchStudent = async () => {

    if (!token) {
      return;
    }

    await api.get<ApiResponse<Student>>('/auth/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {

      if (response.data.statusCode == 400) {
        return;
      }

      setStudent(response.data.data);
      console.log(response.data.data)
    }).then(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchStudent();
  }, [token])

  return (
    <div className="mt-6">
      <div className="bg-muted rounded-2xl px-6 py-3 mx-6 flex flex-col gap-2">

        <div className="grid grid-cols-2">
          <div className="text-dark-light-gray">
            Баркод
          </div>
          <div className="font-semibold text-dark">
            {student?.barcode}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2">
          <div className="text-dark-light-gray">
            Имя
          </div>
          <div className="font-semibold text-dark">
            {student?.name}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-dark-light-gray">
            Фамилия
          </div>
          <div className="font-semibold text-dark">
            {student?.surname}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2">
          <div className="text-dark-light-gray">
            Группа
          </div>
          <div className="font-semibold text-dark">
            {student?.group.name}
          </div>
        </div>

      </div>
    </div>
  );
}
