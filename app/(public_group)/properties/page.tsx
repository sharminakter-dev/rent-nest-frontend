import React from 'react'

const PropertiesPage = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Posts</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage your own news posts.
          </p>
        </div>
        {/* <PostFormDialog mode="create" /> */}
      </div>
{/* 
      <Suspense fallback={<MyPostsSkeleton />}>
        <MyPostsList />
      </Suspense> */}
    </div>
  );

}

export default PropertiesPage