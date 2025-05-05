"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import SelectSorting from "@/components/shared/SelectSorting";
import api from "@/utils/api";

const Users = () => {
  const [searchParam, setSearchParams] = useState("");
  const [sortParam, setSortParam] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", searchParam, sortParam],
    queryFn: async () => {
      let endpoint = `/users`;
      if (searchParam) {
        endpoint += `?username=${searchParam}`;
      }
      if (sortParam) {
        endpoint += searchParam ? `&sort=${sortParam}` : `?sort=${sortParam}`;
      }
      const { data } = await api.get(endpoint);
      return data;
    },
  });

  return (
    <div className="p-5">
      <SelectSorting setSortParam={setSortParam} />
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Input
                type="text"
                placeholder="Name"
                className="bg-transparent border-none"
                value={searchParam}
                onChange={(e) => setSearchParams(e.target.value)}
              />
            </TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Storage</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : users?.users?.length > 0 ? (
            users.users.map((user: any) => {
              const formattedDate = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(user.createdAt));

              return (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.isPremium ? "Premium" : "Free"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    {user.storageLimit}
                  </TableCell>
                  <TableCell className="text-right">{formattedDate}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
