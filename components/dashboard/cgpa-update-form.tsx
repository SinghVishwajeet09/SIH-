import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CgpaUpdateFormProps {
  studentId: string;
  currentCgpa: number;
  onUpdateSubmitted: () => void;
}

export function CgpaUpdateForm({ studentId, currentCgpa, onUpdateSubmitted }: CgpaUpdateFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCgpa, setNewCgpa] = useState("");
  const [semester, setSemester] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/cgpa-updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          newCgpa: parseFloat(newCgpa),
          semester,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit CGPA update");
      }

      toast({
        title: "Success",
        description: "CGPA update request submitted for approval",
      });

      setIsOpen(false);
      onUpdateSubmitted();

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit CGPA update",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update CGPA</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit CGPA Update</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentCgpa">Current CGPA</Label>
            <Input
              id="currentCgpa"
              value={currentCgpa.toFixed(2)}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newCgpa">New CGPA</Label>
            <Input
              id="newCgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              required
              value={newCgpa}
              onChange={(e) => setNewCgpa(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              id="semester"
              required
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., Fall 2025"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit for Approval"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
