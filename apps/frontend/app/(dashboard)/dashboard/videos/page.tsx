"use client";

import api from "@/app/utils/api";
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

const Videos = () => {
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data } = await api.get("/videos/getAllVideos");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;

  return (
    <Table>
      <TableCaption>A list of your recent videos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Video</TableHead>
          <TableHead>ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {videos?.data?.videos?.map((vid: any) => (
          <TableRow key={vid._id}>
            <TableCell>
              <video controls width="200">
                <source
                  src={`http://localhost:4040/api/v1/videos/streamVideo/${vid._id}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </TableCell>
            <TableCell>{vid._id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Videos;
