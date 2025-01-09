<div className="grid gap-8">
  <div className="grid gap-8 md:grid-cols-3">
    <Card className="shadow-lg md:col-span-2">
      <CardHeader>
        <CardTitle className="text-gray-800">Complaints by Brand</CardTitle>
        <CardDescription className="text-gray-600">
          Distribution of complaints across brands
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartJSBar
          data={brandComplaintsData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              y: {
                grid: {
                  color: "rgba(0,0,0,0.05)",
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>

    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-800">Today&apos;s Timeline</CardTitle>
        <CardDescription className="text-gray-600">
          Hourly complaint volume
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Line
          data={todayComplaints}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "rgba(0,0,0,0.05)",
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  </div>
</div>;
