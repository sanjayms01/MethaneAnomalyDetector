
def upwardTriangle(n):
	for i in range(n):
		for j in range(i,n):
			print(" ",end=" ")

		for j in range(i+1):
			print("*", end=" ")

		print()

def downTriangle(n):
	for i in range(n):
		for j in range(i + 1):
			print(" ",end=" ")

		for j in range(i, n):
			print("*", end=" ")
		print()


def printDiamond(msg):
	print()
	print()
	upwardTriangle(10)
	print(f"     {msg}")
	downTriangle(10)