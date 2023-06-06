#include <bits/stdc++.h>
#include <thread>
#include <time.h>
using namespace std;

int num = 0;
const int n = 1000000;
int a[n + 1];

void merge(int left, int right)
{
	int mid = (left + right) / 2;
	int ind1 = left;
	int ind2 = mid + 1;
	int *temp = new int[n + 1];
	int ind = left;
	while (ind1 <= mid || ind2 <= right)
	{
		if (ind1 > mid)
		{
			temp[ind] = a[ind2];
			ind2++;
		}
		else if (ind2 > right)
		{
			temp[ind] = a[ind1];
			ind1++;
		}
		else if (a[ind1] > a[ind2])
		{
			temp[ind] = a[ind2];
			ind2++;
		}
		else
		{
			temp[ind] = a[ind1];
			ind1++;
		}
		ind++;
	}
	for (int i = left; i <= right; i++)
	{
		a[i] = temp[i];
	}

	delete[] temp;
}

void mergeSort(int left, int right)
{
	if (left == right)
	{
		return;
	}
	int mid = (left + right) / 2;
	mergeSort(left, mid);
	mergeSort(mid + 1, right);
	merge(left, right);
}

int main()
{

	for (int i = 0; i < n; i++)
	{
		a[i] = rand() % 1000;
	}

	clock_t start = clock();
	thread merge1(mergeSort, 0, n / 4 - 1);
	thread merge2(mergeSort, n / 4, n / 2 - 1);
	thread merge3(mergeSort, n / 2, 3 * n / 4 - 1);
	thread merge4(mergeSort, 3 * n / 4, n - 1);
	merge1.join();
	merge2.join();
	merge3.join();
	merge4.join();
	merge(0, n / 2 - 1);
	merge(n / 2, n - 1);
	merge(0, n - 1);

	clock_t end = clock();
	double time = (double)(end - start) / CLOCKS_PER_SEC;
	cout << time << endl;
	return 0;
}