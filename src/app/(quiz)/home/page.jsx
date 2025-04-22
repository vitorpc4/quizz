"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  FileQuestion,
} from "lucide-react";
import { useEffect, useState } from "react";
import instance from "@/http";
import DashboardLoad from "@/components/dashboard/dashboard-load";

export default function Dashboard() {
  const [dashboardData, setdashboardData] = useState(null);

  const getData = async () => {
    try {
      const result = await instance.get("/dashboard");
      if (result.status === 200) {
        setdashboardData(result.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!dashboardData || dashboardData.completionTrend === 0) {
    return <DashboardLoad />;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quizzes Realizados
            </CardTitle>
            <FileQuestion className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" suppressHydrationWarning>
              {dashboardData.quizzesCompleted.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +
              {Math.floor(
                dashboardData.completionTrend[7].completions -
                  dashboardData.completionTrend[6].completions
              )}{" "}
              do mês passado
            </p>
            <div className="mt-4 h-[60px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dashboardData.completionTrend}
                  margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                >
                  <Line
                    type="monotone"
                    dataKey="completions"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Quizzes Criados
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-center text-7xl font-bold">
              {dashboardData.quizzesCreated}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Quiz concluídos</CardTitle>
                <CardDescription>
                  Quiz concluídos por mês nos últimos 8 meses.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={dashboardData.completionTrend}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ textTransform: 'capitalize'}} labelStyle={{ color: 'grey'}}  />
                      <Bar
                        dataKey="completions"
                        fill="#0ea5e9"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Quizzes</CardTitle>
                <CardDescription>Quizzes mais concluídos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={dashboardData.topQuizzes}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis
                        dataKey="name"
                        type="category"
                        scale="band"
                        width={100}
                      />
                      <Tooltip contentStyle={{ textTransform: 'capitalize'}} labelStyle={{ color: 'grey'}} />
                      <Bar
                        dataKey="completions"
                        fill="#8884d8"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>
                Análises detalhadas serão exibidas aqui.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Painel de análises em breve...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Os relatórios gerados serão exibidos aqui.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Painel de relatórios em breve...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
