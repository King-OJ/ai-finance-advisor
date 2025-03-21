import { Card, CardHeader, CardContent } from "@/components/ui/card";
import React from "react";
import { Sparkles } from "lucide-react";

function Advice() {
  return (
    <Card>
      <CardHeader className="flex flex-row space-x-1 space-y-0 items-center">
        <h2 className="text-md">SmartFi AI</h2>
        <Sparkles
          className="rounded-full text-white w-8 h-8 p-2
    bg-gradient-to-r
    from-primary
    via-red-500
    to-secondary
    background-animate"
        />
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quos
          harum esse praesentium odit enim dolorem ea velit eligendi
          perspiciatis, magnam eum aperiam nisi magni quis hic alias ab tenetur
          incidunt? Praesentium omnis, voluptatum optio, earum dicta quod nemo
          soluta cumque accusamus repellendus, nihil ratione laborum aut quae
          pariatur magnam.
        </p>
      </CardContent>
    </Card>
  );
}

export default Advice;
